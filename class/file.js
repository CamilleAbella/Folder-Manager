
const fs = require('fs')
const chalk = require('chalk');
const data = require('../data.js')

module.exports = class File{
	constructor(path,encoding){
		this.read(path,encoding)
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
			fullname : this.fullname,
			content : this.content,
			type : this._type,
			path : this._path,
			name : this.name,
			ext : this.ext
		};
	}
	toString(tab,middle){
		let fullname = this.fullname
		if(this.ext==="js"){
			fullname = chalk.yellow(fullname)
		}
		if(this.ext==="rb"){
			fullname = chalk.red(fullname)
		}
		if(this.ext==="json"){
			fullname = chalk.grey(fullname)
		}
		if(this.ext==="md"){
			fullname = chalk.blue(fullname)
		}
		if(!tab) tab = "  ";
		tab = tab.replace(/(╠═|╚═)/g,"  ")
		if(middle){
			tab += "╠═"
		}else{
			tab += "╚═"
		}
		return tab+" "+fullname
	}
	read(path,encoding){
		if(!data.encoding.includes(encoding)){
			encoding = 'utf8'
		}
		this._type = 'file'
		this._path = path
		if(data.banned_ext.includes(this.ext)){
			this.content = "illegal content ⛔"
			this._type = 'unread file'
			return this
		}
		this.content = fs.readFileSync(path,encoding)
		return this
	}
	write(path){
		if(this._type !== 'unread file'){
			fs.writeFileSync(path,this.content)
		}
	}
}