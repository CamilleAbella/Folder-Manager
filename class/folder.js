
const fs = require('fs')
const chalk = require('chalk');
const ProgressBar = require('progress')
const data = require(__dirname+'/../data.js')
const File = require(__dirname+"/file.js")

module.exports = class Folder{
	constructor(path,filter,encoding,next){
		this.read(path,filter,encoding,next)
	}
	get path(){
		return this._path
	}
	get name(){
		return this.fullname.replace("."+this.ext,"")
	}
	get fullname(){
		return this.path.split(/\/|\\/g).pop()
	}
	get ext(){
		let ext = ""
		if(this.fullname.includes(".")){
			ext = this.fullname.slice(this.fullname.lastIndexOf(".")+1)
		}
		return ext.toLowerCase()
	}
	get type(){
		return this._type
	}
	set name(name){
		throw data.errors.nomodif("name")
	}
	set path(nil){
		throw data.errors.nomodif("path")
	}
	set fullname(nil){
		throw data.errors.nomodif("fullname")
	}
	set type(nil){
		throw data.errors.nomodif("type")
	}
	simplify(type){
		if(!type || type === "array"){
			return this.content.map(item=>item.simplify(type))
		}else if(type === "object"){
			let object = {}
			this.content.forEach(function(item){
				object[item.fullname] = item.simplify(type)
			})
			return object
		}else if(type === "string"){
			return this.toString()
		}else{
			return false
		}
	}
	forEach(fn){
		this.content.forEach(function(item){
			if(item.type==="folder"){
				item.forEach(fn)
			}
			fn(item)
		})
	}
	find(fn,all){
		let found = [];
		this.content.forEach(function(item){
			if(item.type==="folder"){
				item.find(fn,all)
			}
			if(fn(item)){
				found.push(item)
			}
		})
		return all ? found : found[0]
	}
	map(fn){
		return this.content.map(function(item){
			if(item.type==="folder"){
				return item.map(fn)
			}
			return fn(item)
		})
	}
	values(filter){
		let values = []
		this.forEach(function(item){
			if(!filter || filter(item)){
				values.push(item)
			}
		})
		return values
	}
	keys(filter){
		let keys = []
		this.forEach(function(item){
			if(!filter || filter(item)){
				keys.push(item.path)
			}
		})
		return keys
	}
	entries(filter){
		let entries = []
		this.forEach(function(item){
			if(!filter || filter(item)){
				entries.push([item.path,item])
			}
		})
		return entries
	}
	files(filter){
		return this.values(filter).filter(item=>{
			return item.type === 'file' || item.type === 'unread file'
		})
	}
	folders(filter){
		return this.values(filter).filter(item=>{
			return item.type === 'folder' || item.type === 'unread folder'
		})
	}
	toJSON(simplify){
		return simplify ? this.simplify() : {
			content : this.content,
			type : this._type,
			path : this._path,
			name : this.name
		};
	}
	toArray(){
		return this.simplify()
	}
	copyJSON(replacer,reviver){
		return JSON.parse(JSON.stringify(this,replacer),reviver)
	}
	toString(tab,middle){
		if(!tab) tab = "  ";
		tab = tab.replace(/(╠═|╚═)/g,"  ")
		if(middle){
			tab += "╠═"
		}else{
			tab += "╚═"
		}
		let ftab = "═"
		if(this.content.length>0){
			ftab = "╦"
		}
		return [tab+ftab+"[ "+chalk.bold(this.fullname)+" ]"].concat(this.content.sort(function(item){
			return item.type === "folder" ? 1 : -1
		}).map(function(item,i,arr){
			if(i<arr.length-1){
				return item.toString(tab,true)
			}
			return item.toString(tab,false)
		})).join("\n")
	}
	read(path,filter,encoding,next){
		if(!data.encoding.includes(encoding)){
			encoding = 'utf8'
		}
		if(!filter) filter = () => true ;
		if(path.endsWith("/")){
			path = path.slice(0,path.length-1)
		}
		let dirents = fs.readdirSync(path,{
			withFileTypes : true,
			encoding : encoding
		})
		let bar;
		if(!next){
			bar = new ProgressBar('[:bar] :percent was read from '+path, { 
				total: dirents.length,
				complete: '═',
				incomplete: ' ',
				width: 20
			})
		}
		this._type = 'folder'
		this._path = path
		this.content = dirents.map(function(dirent){
			if(!next) bar.tick();
			if(dirent.isFile()){
				let ext = dirent.name.slice(dirent.name.lastIndexOf(".")+1)
				let name = dirent.name.replace("."+ext,"")
				if(filter.length<3){
					if(filter(name,ext)){
						return new File(path+"/"+dirent.name,encoding)
					}
					return false
				}
				let file = new File(path+"/"+dirent.name,encoding)
				if(filter(name,ext,file)){
					return file
				}
				return false
			}else if(dirent.isDirectory()){
				if(filter(dirent.name)){
					return new Folder(path+"/"+dirent.name,filter,encoding,true)
				}
				return false
			}
		}).filter(item=>item!==false)
		return this
	}
	write(path,next){
		if(!path) path = this._path;
		if(!fs.existsSync(path)){
			fs.mkdirSync(path)
		}
		if(path.endsWith("/")){
			path = path.slice(0,path.length-1)
		}
		let folder = this
		let bar;
		if(!next){
			bar = new ProgressBar('[:bar] :percent was written to '+path, { 
				total: folder.content.length,
				complete: '═',
				incomplete: ' ',
				width: 20
			})
		}
		this.content.forEach(function(item){
			item.write(item.path.replace(folder._path,path),true)
			bar.tick()
		})
	}
}