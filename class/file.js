
const fs = require('fs')
const data = require('../data.js')

module.exports = class File{
	constructor(path,encoding){
		this.read(path,encoding)
	}
	get path(){
		return this._path
	}
	get name(){
		return this._name
	}
	get fullname(){
		return this._fullname
	}
	get ext(){
		return this._ext
	}
	get type(){
		return this._type
	}
	set name(name){
		let splitpath = this._path.split(/\/|\\/g)
		let basepath = splitpath.slice(0,splitpath.length-1).join("/")
		this._path = basepath+"/"+name
		this._name = name
	}
	set path(nil){
		throw data.errors.nomodif("path")
	}
	set fullname(nil){
		throw data.errors.nomodif("fullname")
	}
	set ext(nil){
		throw data.errors.nomodif("ext")
	}
	set type(nil){
		throw data.errors.nomodif("type")
	}
	simplify(){
		return this.content
	}
	toJSON(simplify){
		return simplify ? this.simplify() : {
			fullname : this._fullname,
			content : this.content,
			type : this._type,
			path : this._path,
			name : this._name,
			ext : this._ext
		};
	}
	toString(tab,middle){
		if(!tab) tab = "  ";
		tab = tab.replace(/(╠═|╚═)/g,"  ")
		if(middle){
			tab += "╠═"
		}else{
			tab += "╚═"
		}
		return tab+" "+this.fullname
	}
	read(path,encoding){
		if(!data.encoding.includes(encoding)){
			encoding = 'utf8'
		}
		this._type = 'file'
		this._path = path
		this._fullname = path.split(/\/|\\/g).pop()
		if(this._fullname.includes(".")){
			this._ext = this._fullname.slice(this._fullname.lastIndexOf(".")+1)
		}else{
			this._ext = ""
		}
		this._name = this._fullname.replace("."+this._ext,"")
		if(data.banned_ext.includes(this._ext)){
			this.content = "illegal content ⛔"
			this._type = 'unread file'
			return this
		}
		if(this._ext)
		this.content = Object.freeze(fs.readFileSync(path,encoding))
		return this
	}
	write(path){
		if(this._type !== 'unread file'){
			fs.writeFileSync(path,this.content)
		}
	}
}