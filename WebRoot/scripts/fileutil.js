function getRootName(callback) {

	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, callback, function(
			error) {
		alert(error.code);
	});

}

function getRootAll() {

	// alert("getroot=" + LocalFileSystem.PERSISTENT);
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
		// alert("Root = " + fs.root.fullPath);
		var directoryReader = fs.root.createReader();
		directoryReader.readEntries(function(entries) {
			var i;
			for (i = 0; i < entries.length; i++) {
				alert(entries[i].name);

			}
		}, function(error) {
			alert(error.code);
		})
	}, function(error) {
		alert(error.code);
	});

}

function download() {
	alert("downlaod");
	var fileTransfer = new FileTransfer();
	alert("downlaod3");
	var url = "http://www.irs.gov/pub/irs-pdf/fw4.pdf";
	// var filePath = window.appRootDir.fullPath + "/test.pdf";
	filePath = filePath + "/test.pdf";
	alert("Downlaod path=" + filePath);
	fileTransfer.download(url, filePath, function(entry) {
		alert("download complete: " + entry.fullPath);
	}, function(error) {
		alert("download error" + error.source);
	});
}
function FSdownload(url, saveToLocation) {
	var fileTransfer = new FileTransfer();
	fileTransfer.download(url, saveToLocation, function(entry) {
		alert("download complete: " + entry.fullPath);
	}, function(error) {
		alert("download error" + error.source);
	});
}
function FScreateDir(path, dirName) {

	// alert("FScreateDir");

	getRootName(function(fs) {
		// alert("Root = " + fs.root.fullPath);
		var fullPath = path + "/" + dirName;
		// alert("fullpath=" + fullPath);
		var dataDir = fs.root.getDirectory(fullPath, {
			create : true
		});
	});
	// var file=dataDir.getFile("lockfile.txt", {create: true, exclusive:
	// true});

}

function FSdirContents(path) {

	alert("FSdirContents=" + path);

	try {

		var dirEntry = new DirectoryEntry({
			fullPath : path
		});

		alert("direntry=" + dirEntry);

		var directoryReader = dirEntry.createReader();

		alert("dirReader=" + directoryReader);

		directoryReader.readEntries(function() {
			for (i = 0; i < entries.length; i++) {
				if (entries[i].isDirectory) {
					alert("dir=" + entries[i].name);
				} else {
					alert("file=" + entries[i].name);
				}
			}

		}, function() {
			alert("FSdirContents fail");
		});

	} catch (e) {

		alert(dump(e));

	}

}
function list(thePath) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
		alert("List = " + fs.root.fullPath+" ---thePath="+thePath);
		var dirEntry = new DirectoryEntry({
			fullPath : thePath
		});
		
	
		
		
		//var directoryReader = fs.root.createReader();
		alert("direntry = " + dirEntry.fullPath);
		var directoryReader = dirEntry.fullPath.createReader();
		directoryReader.readEntries(function(entries) {
			var i;
			for (i = 0; i < entries.length; i++) {
				alert(entries[i].name);

			}
		}, function(error) {
			alert(error.code);
		})
	}, function(error) {
		alert(error.code);
	});

}

function FSgetDir(theDir, success)
{
	alert("FSgetDir");
	getRootName(function(fs) {
		fs.root.getDirectory(theDir, {create: false, exclusive: false}, success, fail);
	});	

}
function getDirSuccess(dirEntry) {
	
	//alert("getDirSuccess="+dirEntry);
    // Get a directory reader
    var directoryReader = dirEntry.createReader();

    // Get a list of all the entries in the directory
    directoryReader.readEntries(readerSuccess,fail);
}

function readerSuccess(entries) {
	alert("readerSuccess="+entries.length);
    var i;
    for (i=0; i<entries.length; i++) {
    	alert("readerSuccess="+entries[i].name);
        // Assuming everything in the Music directory is an mp3, go nuts
        // otherwise check entries[i].name to see if it ends with .mp3
    }
}
function fail()
{
  alert("dir failed");	
}