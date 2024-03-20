// Bring a sprite to the front of the display list
function BringToFront(sprite){
    if (sprite.parent) {
        let parent = sprite.parent;
        parent.removeChild(sprite);
        parent.addChild(sprite);
    }
}
// Remove all children from the current scene
function ClearCurrentScene(){
    while (stage.children[0]) {
        stage.removeChild(stage.children[0]);
    }
}
function CapitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}