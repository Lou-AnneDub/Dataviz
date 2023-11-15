function scriptPilotes(){

d3.json("pilotes.json")
  .then(function(data) {
    let currentYear = 0;
    const svg = d3.select("svg");
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    function updateChart(yearData) {
      const colorScale = d3.scaleOrdinal()
        .domain(["Ferrari", "McLaren", "Williams", "Renault", "Honda", "Red Bull", "Brawn", "Mercedes", "Lotus"])
        .range(["#C70001", "#FF9100", "#1F54D2", "#04B0E8", "#BBBBBB", "#7A36D0", "#99D41B", "#00D0D2", "#F2CD18"]);

      // Trouver le maximum des points pour l'année en cours
      const maxPoints = d3.max(yearData.pilotes, d => d.points);

      // Ajuster la hauteur du SVG en fonction du maximum des points
      const svgHeight = maxPoints + margin.top + margin.bottom;
      svg.attr("height", svgHeight);

      const width = +svg.attr("width") - margin.left - margin.right;
      const height = svgHeight - margin.top - margin.bottom;

      const g = svg.selectAll("g")
        .data([null])
        .join("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const bars = g.selectAll(".bar")
        .data(yearData.pilotes);

      bars.join("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) { return i * (width / 3); })
        .attr("y", function(d) { return height - d.points; })
        .attr("height", function(d) { return d.points; })
        .attr("width", width / 3)
        .attr("fill", function(d) { return colorScale(d.team); })
        .append("title")
        .text(function(d) { return "Rank: " + d.rank; });

      bars.exit().remove();

      // Ajout du numéro de rang au bas de chaque rectangle
      const text = g.selectAll(".bar-text")
        .data(yearData.pilotes);

      text.join("text")
        .attr("class", "bar-text")
        .attr("x", function(d, i) { return i * (width / 3) + (width / 6); })
        .attr("y", function(d) { return height - 10; })
        .text(function(d) { return d.rank; });

      text.exit().remove();

      // Ajout du nom du pilote au bas de chaque rectangle
      const nameText = g.selectAll(".name-text")
        .data(yearData.pilotes);

      nameText.join("text")
        .attr("class", "name-text")
        .attr("x", function(d, i) { return i * (width / 3) + (width / 6); })
        .attr("y", function(d) { return height + 20; })
        .text(function(d) { return d.name; })
        .attr("text-anchor", "middle");

      nameText.exit().remove();

      // Affichage de l'année actuelle
      d3.select("#currentYear").text("Année " + yearData.year);
    }

    window.changeYear = function(change) {
      currentYear += change;
      if (currentYear < 0) {
        currentYear = 0;
      } else if (currentYear >= data.length) {
        currentYear = data.length - 1;
      }
      updateChart(data[currentYear]);
    };

    updateChart(data[currentYear]);
  })
  .catch(function(error) {
    console.error("Erreur lors du chargement des données :", error);
  });

}


function scriptTeams(){

  d3.json("ecuries.json")
    .then(function(data) {
      let currentYear = 0;
      const svg = d3.select("svg");
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  
      function updateChart(yearData) {
        const colorScale = d3.scaleOrdinal()
          .domain(["Ferrari", "McLaren", "Williams", "Renault", "Honda", "Red Bull", "Brawn", "Mercedes", "Lotus", "BMW Sauber"])
          .range(["#C70001", "#FF9100", "#1F54D2", "#04B0E8", "#BBBBBB", "#7A36D0", "#99D41B", "#00D0D2", "#F2CD18", "#C2325B"]);
  
        // Trouver le maximum des points pour l'année en cours
        const maxPoints = d3.max(yearData.ecuries, d => d.points);
  
        // Ajuster la hauteur du SVG en fonction du maximum des points
        const svgHeight = maxPoints + margin.top + margin.bottom;
        svg.attr("height", svgHeight);
  
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;
  
        const g = svg.selectAll("g")
          .data([null])
          .join("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        const bars = g.selectAll(".bar")
          .data(yearData.ecuries);
  
        bars.join("rect")
          .attr("class", "bar")
          .attr("x", function(d, i) { return i * (width / 3); })
          .attr("y", function(d) { return height - d.points; })
          .attr("height", function(d) { return d.points; })
          .attr("width", width / 3)
          .attr("fill", function(d) { return colorScale(d.name); })
          .append("title")
          .text(function(d) { return "Rank: " + d.rank; });
  
        bars.exit().remove();
  
        // Ajout du numéro de rang au bas de chaque rectangle
        const text = g.selectAll(".bar-text")
          .data(yearData.ecuries);
  
        text.join("text")
          .attr("class", "bar-text")
          .attr("x", function(d, i) { return i * (width / 3) + (width / 6); })
          .attr("y", function(d) { return height - 10; })
          .text(function(d) { return d.rank; });
  
        text.exit().remove();
  
        // Ajout du nom du pilote au bas de chaque rectangle
        const nameText = g.selectAll(".name-text")
          .data(yearData.ecuries);
  
        nameText.join("text")
          .attr("class", "name-text")
          .attr("x", function(d, i) { return i * (width / 3) + (width / 6); })
          .attr("y", function(d) { return height + 20; })
          .text(function(d) { return d.name; })
          .attr("text-anchor", "middle");
  
        nameText.exit().remove();
  
        // Affichage de l'année actuelle
        d3.select("#currentYear").text("Année " + yearData.year);
      }
  
      window.changeYear = function(change) {
        currentYear += change;
        if (currentYear < 0) {
          currentYear = 0;
        } else if (currentYear >= data.length) {
          currentYear = data.length - 1;
        }
        updateChart(data[currentYear]);
      };
  
      updateChart(data[currentYear]);
    })
    .catch(function(error) {
      console.error("Erreur lors du chargement des données :", error);
    });
  
  }

  document.addEventListener("DOMContentLoaded", function() {
    scriptPilotes();  // Appele la fonction scriptPilotes par défaut
    document.getElementById("pilotes").addEventListener("click", scriptPilotes);
    document.getElementById("teams").addEventListener("click", scriptTeams);
  });