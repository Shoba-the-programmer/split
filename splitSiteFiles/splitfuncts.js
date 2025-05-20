//heavily linked to the server side databse work so may need to sort that out first. or just do ?

//the story processing functions that splits gotten text into a story objects for play and preview


function getscene(page){
    //from the page, if a [[?]]: exists then thats a new scene linked foerm a button, letsgo
    if (typeof page != String){return "Page string not received";}
    var sceneName, sceneText;
    //separate the text within [[]]: for the scene name
    let preclean = page; //get the page to scourge the scene name from
    let cleaning = preclean.match(/\[\[(.*?)\]\]/); //get the name from the double brackets
    if (cleaning) {
        sceneName = cleaning[1]; //get the name form the [[]] and save it to extracted
        console.log(sceneName); // Output: the scene's name
        //document.getElementById("extracted").innerHTML = extracted;

        //then get the patchscenes text
        const pathtxt = page.replace(cleaning[0], "").trim(); // Remove the matched part from string
        return [sceneName, pathtxt];
        
    } else {
        console.log("No match found");
        return "Error";
}}

function gotoPath(sc, pathName) {
    var newPath = sc.find(function (obj) { return obj.name === pathName; });
    if (newPath) {
        //console.log(newPath); //log then return the path
        return newPath;
    }
    else {
        console.log("No path found with the name \"".concat(pathName, "\"."));
        return null;
    }
}

//converted from typescript locally then copied here!
function extractBrackets(text) {
    var regex = /\[\[(.*?)\]\]/g; // Match anything inside [[...]]
    var matches = [];
    var match;
    // Loop through all matches in the text
    while ((match = regex.exec(text)) !== null) {
        matches.push(match[1]); // Capture the content inside [[...]]
    }
    return matches;
}

function parseText(input) {
    var regex = /\[\[([A-Za-z0-9]+)\]\]:/g;
    var matches;
    var chapter = [];
    // Splitting based on matches
    var lastIndex = 0;
    while ((matches = regex.exec(input)) !== null) {
        // Extract name
        var name_1 = matches[1];
        // Extract text following the match
        var startIndex = matches.index + matches[0].length;
        var nextMatch = regex.exec(input);
        var endIndex = nextMatch ? nextMatch.index : input.length;
        var lines = input.slice(startIndex, endIndex).trim();
        var choices = extractBrackets(lines);
        // Save into the object
        chapter.push({ name: name_1, lines: lines, choices: choices });
        // Reset regex lastIndex for next iteration
        regex.lastIndex = startIndex;
    }
    return chapter;
}


function attriibuting(){
    //function that gets any stat/attribute chanegs that occur within the scene

}

function convertChoicesToButtons(choice, choicetext) {
    //gets the text and converts the items within the chocie boxes to names to be saved as choice.Name post return
    return choicetext.replace(/\[\[(.*?)\]\]/g, (match, choice) => {
        return `<button onclick="updateStory('${choice}')">${choice}</button>`;
    });
}

function playthrough(story){
    let newPageContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${story.name}</title>
            <script>
                function updateStory(nextName) {
                    window.location.href = "?story=" + nextName;
                }
            </script>
        </head>
        <body>
            <p>${convertChoicesToButtons(story.lines)}</p>
        </body>
        </html>
    `;
}