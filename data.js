
module.exports = {
	encoding : [
		"ascii","base64","binary","hex",
		"ucs2","ucs-2","utf16le","utf-16le",
		"utf8","utf-8","latin1","ISO8859-1"
	],
	banned_ext : [
		"ai","bmp","gif","ico",
		"jpg","jpeg","png","ps",
		"psd","svg","tif","tiff",
		"3g2","3gp","avi","flv",
		"h264","m4v","mkv","mov",
		"mp4","mpeg","mpg","rm",
		"swf","vob","wmv","exe",
		"rar","zip","aif","cda",
		"mid","midi","mp3","mpa",
		"ogg","wav","wma","wpl",
		"7z","arj","deb","pkg","rpm",
		"tar","gz","z","bin","iso",
		"toast","dmg","vcd","db","dbf",
		"mdb","sql","apk","bat","jar",
		"fnt","fon","otf","ttf","part",
		"key","odp","pps","ppt","pptx",
		"ods","xlr","xls","xlsx","dll",
		"bak","cab","cfg","cpl","cur",
		"dmp","drv","icns","msi","sys",
		"tpm","doc","docx","pdf","rtf",
		"tex","wks","wps","wpd"
	],
	errors : {
		nomodif : function(varname){
			let err = new Error("the \""+varname+"\" property is not modifiable")
			err.name = "AccessError"
			return err
		}
	}
}