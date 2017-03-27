function openGallery(clicky)
{
    if (clicky != "buitenschrijnwerk" && clicky != "interieurs" && clicky != "events"){
    window.location.href = "galleries/"+clicky+".html";
} else {
    window.location.href = clicky+".html";
}
}
