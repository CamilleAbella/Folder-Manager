![Bannière](https://media.discordapp.net/attachments/554206505897951252/559258334067294218/barre.png?width=770&height=5)

# Folder Manager

## What is it ?

 This folder manager serves, as the name implies, to read, write, list, transform, clone, filter and display the contents of folders. All his methods are synchronous.

> *"Based on simplicity because we are human"*

## How to install ?

Open a console, go to your project folder with `cd` and type the following command.

```bash
npm install folder-manager
```

## What does this package contain ?

### Parameters :

- **item** represents a file object or a folder object.  
- **folder** represents a folder object.
- **file** represents a file object.
- **outputType** denotes the typing of the expected value in return. He can be object, array and string.  
- **existingPath** is nothing more than an existing full path.  
- **newPath** is a new path commonly requested when creating a folder or a file.  
- **encoding** is simply the encoding code for reading and writing files.  
- **json** is just a stringable object. View the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
- Parameters whose names end with a **question mark** are Booleans. They simply ask whether or not the method cited by the parameter will be applied.
- The **{}** symbolize a function, what is inside are its possible arguments

### Classes and functions :

- #### Native functions

	-  *function* **simplify**( item [, outputType ])  
		- returns : (Array[ Array || String] || Object || String) || *false*
	- *function* **read**( existingPath [, encoding ])
		- returns : (File || Object) || *false*
	- *function* **write**( item, newPath )
	- *function* **readFolder**( existingPath [, filter{ name, ext, item } [, encoding ]])
		- returns : Folder || *false*
	- *function* **readFile**( existingPath [, encoding ])
		- returns : File || *false*
	- *function* **copyFolder**( existingPath, newPath [, filter{ name, ext, item } [, encoding ]])
		- returns : Folder
	- *function* **copyJSON**( json [, replacer{ key, value } [, reviver{ key, value } ]])
		- returns : Object

- #### *Class* File

	- *function* **write**( newPath )
	- *function* **read**( existingPath [, encoding ])
		- returns : *this*
	- *function* **simplify**()
		- returns : String
	- *function* **toString**()
		- returns : String
	- *function* **toJSON**([ simplify? ])
		- returns : Object
	- *const* **path** => *Full path* => String
	- *const* **fullname** => *Full file name* => String
	- *const* **ext** => *File extession* => String
	- *const* **content** => *File content* => String
	- *const* **type** => *Type of item* => *"file"* || *"unread file"*
	- *var* **name** => *File name* => String

- #### *Class* Folder

	- *function* **write**( newPath )
	- *function* **read**( existingPath [, filter [, encoding ]])
		- returns : *this*
	- *function* **forEach**( function{ item } )
	- *function* **map**( substitute{ item } )
		- returns : Array[ ?]
	- *function* **find**( filter{ item } [, findAll? ])
		- returns : (Folder || File) || Array[ File || Folder] || *undefined*
	- *function* **values**( filter{ item } )
		- returns : Array[ File || Folder]
	- *function* **keys**( filter{ item } )
		- returns : Array[ String]
	- *function* **entries**( filter{ item } )
		- returns : Array[ Array]
	- *function* **files**( filter{ item } )
		- returns : Array[ File]
	- *function* **folders**( filter{ item } )
		- returns : Array[ Folder]
	- *function* **simplify**( [ outputType ])
		- returns : (Array[ Array || String] || Object || String) || *false*
	- *function* **toString**()
		- returns : String
	- *function* **toJSON**([ simplify? ])
		- returns : Object
	- *function* **toArray**()
		- returns : Array
	- *function* **copyJSON**( json [, replacer{ key, value } [, reviver{ key, value } ]])
		- returns : Object
	- *const* **path** => *Full path* => String
	- *const* **fullname** => *Full folder name* => String
	- *const* **content** => *Folder content* => String
	- *const* **type** => *Type of item* => *"folder"* || *"unread folder"*
	- *var* **name** => *File name* => String

## How to use ?

```js
// A complete demonstration will be there soon
```

![Bannière](https://media.discordapp.net/attachments/554206505897951252/559258334067294218/barre.png?width=770&height=5)
