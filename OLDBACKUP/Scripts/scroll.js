
        $(document).ready(function () {

            var lastId,
            topMenu = $("#top-menu"),
            topMenuHeight = topMenu.outerHeight() - 35,
            // All list items
            menuItems = topMenu.find("a.anchorLink"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function () {
                var item = $($(this).attr("href"));
                if (item.length) { return item; }
            });

            // Bind click handler to menu items
            // so we can get a fancy scroll animation
            menuItems.click(function (e) {
                var href = $(this).attr("href"),
                    offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
                $('html, body').stop().animate({
                    scrollTop: offsetTop
                }, 300);
                e.preventDefault();
            });

            // Bind to scroll
            $(window).scroll(function () {
                // Get container scroll position
                var fromTop = $(this).scrollTop() + topMenuHeight;

                // Get id of current scroll item
                var cur = scrollItems.map(function () {
                    if ($(this).offset().top < fromTop)
                        return this;
                });
                // Get the id of the current element
                cur = cur[cur.length - 1];
                var id = cur && cur.length ? cur[0].id : "";

                if (lastId !== id) {
                    lastId = id;
                    // Set/remove active class
                    menuItems
                      .parent().removeClass("active")
                      .end().filter("[href=#" + id + "]").parent().addClass("active");
                }
            });


            $('.btnBuy').on('click', function () {
                $('#shopItemIdHidden').val($(this).data('item-id'));
                $('#orderPopupHeader').html($(this).data('item-name'));
                $('#modalEshop').modal('show');
            });

            $('#modalEshop').modal('hide');

            $('.fancybox').fancybox({
                helpers: {
                    overlay: {
                        locked: false
                    }
                }
            });

            // SET HEIGHT OF TOP SHOWBOX

            $(document).ready(sizeContent);
            $(window).resize(sizeContent);
            function sizeContent() {
                var newHeight = $("html").height() + "px";
                $(".showboxMain").css("height", newHeight);
                $(".shoutboxMainContent").css("height", newHeight);
            }

            $(window).on("scroll", function () {
                var fromTop = $(window).scrollTop();
                $(".headerBlock").toggleClass("down", (fromTop > 10));
            });

            $("#open").click(function () {
                $(".photoShow").show();
                $("#open").hide();
            });
            $("#close").click(function () {
                $(".photoShow").hide();
                $("#open").show();
            });
        });
