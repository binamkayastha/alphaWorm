$(document).ready(function() {
	$(function() {
		var headers = ["H1","H2","H3","H4","H5","H6"];

		$(".accordion").click(function(e) {
			var target = e.target;
			var name = target.nodeName.toUpperCase();

			if ($(target).hasClass("not-collapsible")) {
				return;
			}

			if ($(target).hasClass("do-not-cause-collapse")) {
				return;
			}

			if($.inArray(name, headers) > -1) {
				var subItem = $(target).next();
				if (subItem[0].tagName != "DIV") return;

				// slideUp all elements (except target) at current depth or greater
				var depth = $(subItem).parents().length;
				var allAtDepth = $(".accordion p, .accordion div").filter(function() {
					if ($(this).hasClass("never-close")) {
						return false;
					}

					if ($(this).parents().length >= depth && this !== subItem.get(0)) {
						var groupHandle = this.previousElementSibling;

						$(groupHandle).removeClass("open");
						$(groupHandle).removeClass("close");
						$(groupHandle).addClass("close");

						return true;
					}

					return false;
				});

				$(allAtDepth).slideUp("fast");

				// slideToggle target content and adjust bottom border if necessary
				subItem.slideToggle("fast", function() {
					$(".accordion :visible:last").css("border-radius", "0 0 10px 10px");

					var parent = this.previousElementSibling;
					if (!parent) return;

					$(parent).removeClass("open");
					$(parent).removeClass("close");

					if (this.style.display == "block")
						$(parent).addClass("open");
					else
						$(parent).addClass("close");
				});
			}
		});
	});

	var selected = $(".accordion a.selected")[0];

	if (selected) {
		var parent = selected.parentNode.parentNode;
		$(parent).addClass("active-menu");

		while (parent.previousElementSibling.tagName != "H1") {
			parent = parent.parentNode;
			$(parent).addClass("active-menu");
		}
	}

	var parents = $(".accordion h1, .accordion h2, .accordion h3, .accordion h4").filter(function() {
		var nextSibling = this.nextElementSibling;
		return !$(this).hasClass("do-not-cause-collapse") && (nextSibling && nextSibling.tagName == "DIV");
	});

	parents.css("cursor", "pointer").css("position", "relative").addClass("arrow");

	parents.each(function() {
		var childrenContainer = this.nextElementSibling;

		if ($(childrenContainer).hasClass("active-menu"))
			$(this).addClass("open");
		else
			$(this).addClass("close");
	});

	if (selected && selected.parentNode.className.split(" ").indexOf("arrow") > -1) {
		$(selected.parentNode).removeClass("open");
		$(selected.parentNode).removeClass("close");

		$(selected.parentNode).addClass("open");

		selected.parentNode.nextElementSibling.style.display = "block";
	}
});