$(document).ready(function () {
    $("#reset").click(function (e) {
        location.reload();
    });

    $("#submitButton").click(function (e) {
        $.ajax({
            type: "GET",
            url: "https://swapi.co/api/planets/",
            dataType: "json",
            success: function (result, status, xhr) {
                res = CreateSwapiJson(result);
                $("#swapiTable").append("<thead><tr><th>Nama</th><th>Rotasi Periode</th><th>Periode Orbital</th><th>Diameter</th><th>Climad</th><th>Gravity</th><th>Terrain</th><th>Surface Water</th><th>residents</th></thead></table>");
                $('#swapiTable').DataTable({
                    data: JSON.parse(res),
                    columns: [
                        { data: 'name' },
                        { data: 'rotation_period' },
                        { data: 'orbital_period' },
                        { data: 'diameter' },
                        { data: 'climad' },
                        { data: 'gravity' },
                        { data: 'terrain' },
                        { data: 'surface_water' },
                        { data: 'residents' }
                    ],
                    "pageLength": 3
                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    });

    function CreateSwapiJson(json) {
        var newJson = "";
        for (i = 0; i < json.list.length; i++) {
            name = json.list[i].name;
            rotation_period = json.list[i].result.rotation_period
            orbital_period = json.list[i].result.orbital_period
            diameter = json.list[i].result.diameter
            climad = json.list[i].result.climad
            gravity = json.list[i].result.gravity
            terrain = json.list[i].result.terrain
            surface_water = json.list[i].result.surface_water
            residents = json.list[i].result.residents

            newJson = newJson + "{";
            newJson = newJson + "\"name\"" + ": " + name + ","
            newJson = newJson + "\"rotaion_period\"" + ": " + "\"" + rotation_period + "\"" + ","
            newJson = newJson + "\"orbital_period\"" + ": " + orbital_period + ","
            newJson = newJson + "\"diameter\"" + ": " + diameter + ","
            newJson = newJson + "\"climad\"" + ": " + climad + ","
            newJson = newJson + "\"gravity\"" + ": " + gravity + ","
            newJson = newJson + "\"terrain\"" + ": " + terrain + ","
            newJson = newJson + "\"surface_water\"" + ": " + surface_water + ","
            newJson = newJson + "\"residents\"" + ": " + residents 
            newJson = newJson + "},";
        }
        return "[" + newJson.slice(0, newJson.length - 1) + "]"
    }
});