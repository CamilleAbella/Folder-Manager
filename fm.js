const fs = require('fs')
const File = require(__dirname+"/class/file.js")
const Folder = require(__dirname+"/class/folder.js")

module.exports = {
	File : File,
	Folder : Folder,
	simplify : function(item,type){
		return item.simplify(type)
	},
	readFolder : function(path,filter,encoding){
		return new Folder(path,filter,encoding) || false
	},
	readFile : function(path,encoding){
		return new File(path,encoding) || false
	},
	read : function(path,encoding){
		if(fs.lstatSync(path).isDirectory()){
			return this.readFolder(path,encoding)
		}
		return this.readFile(path,encoding)
	},
	write : function(item,path){
		item.write(path)
	},
	copyFolder : function(src,dest,filter,encoding){
		let folder = this.readFolder(src,filter,encoding)
		folder.write(dest)
		return folder
	},
	copyJSON : function(json,filter,reviver){
		return JSON.parse(JSON.stringify(json,filter),reviver)
	}
}