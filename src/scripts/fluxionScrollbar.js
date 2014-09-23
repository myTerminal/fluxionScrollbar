var fluxionScrollbar = function (scrollerSelector, options) {
    var mouseDownOnContentY = null,
        mouseDownOnHandleY = null,
        scroller = $(scrollerSelector),
        scrollParent,
        scrollContainer,
        scrollControls,
        scrollHandleContainer,
        scrollHandle,
        scrollHandleBar,
        scrollHandleTrack,
        setUpScrollMarkup = function () {
            scroller.css("-moz-user-select", "none");
            scroller.css("-webkit-user-select", "none");
            scroller.attr("onselectstart", "return false;");

            var scrollContent = scroller.html();
            scroller.html('<div class="fluxionScrollParent">' +
                            '<div class="fluxionScrollContainer">' +
                              scrollContent +
                            '</div>' +
                            '<div class="fluxionScrollControls">' +
                              '<div class="fluxionScrollHandleContainer">' +
                                '<div class="fluxionScrollHandle">' +
                                  '<div class="fluxionScrollHandleBar"></div>' +
                                '</div>' +
                                '<div class="fluxionScrollHandleTrack"></div>' +
                              '</div>' +
                            '</div>' +
                          '</div>');

            scrollParent = scroller.find(".fluxionScrollParent");
            scrollContainer = scroller.find(".fluxionScrollContainer");
            scrollControls = scroller.find(".fluxionScrollControls");
            scrollHandleContainer = scroller.find(".fluxionScrollHandle");
            scrollHandle = scroller.find(".fluxionScrollHandle");
            scrollHandleBar = scroller.find(".fluxionScrollHandleBar");
            scrollHandleTrack = scroller.find(".fluxionScrollHandleTrack");
        },
        activate = function () {
            setUpScrollMarkup();
            applyBindings();
            update();
        },
        update = function () {
            var scrollerHeight = scroller.height(),
                scrollContainerHeight = scrollContainer.height();

            if(scrollerHeight > scrollContainerHeight) {
                scrollControls.hide();
            } else {
                scrollControls.show();
            }

            var contentToContainerRatio = scrollerHeight / scrollContainerHeight,
                handleTrackHeight = scrollHandleTrack.height(),
                updatedHandleHeight = contentToContainerRatio * handleTrackHeight;
            scrollHandle.css("height", updatedHandleHeight);
        },
        applyBindings = function () {
            scrollContainer.bind("mousedown", function (evt) {
                mouseDownOnContentY = evt.clientY;
            });

            scrollContainer.bind("mousemove", function (evt) {
                if (mouseDownOnContentY) {
                    pan(mouseDownOnContentY - evt.clientY);
                    mouseDownOnContentY = evt.clientY;
                }
            });

            scrollContainer.bind("mouseout mouseup", function (evt) {
                mouseDownOnContentY = null;
            });

            scrollHandle.bind("mousedown", function (evt) {
                mouseDownOnHandleY = evt.clientY;
            });

            scrollParent.bind("mousemove", function (evt) {
                var scrollableOffset = -(mouseDownOnHandleY - evt.clientY),
                    draggableOffset = scrollableOffset * getContentToContainerRatio();
                if (mouseDownOnHandleY) {
                    pan(draggableOffset);
                    mouseDownOnHandleY = evt.clientY;
                }
            });

            scrollParent.bind("mouseout mouseup", function (evt) {
                mouseDownOnHandleY = null;
            });
        },
        getNumberOrDefault = function (input, parser, _default) {
            var parserToUse = (parser || parseInt),
                parsedValue = parserToUse(input);
            return isNaN(parsedValue) ? _default : parsedValue;
        },
        getNumberOrZero = function (input, parser) {
            return getNumberOrDefault(input, parser, 0);
        },
        pan = function (offset) {
            var scrollContainerTop = scrollContainer.css("top"),
                scrollContainerHeight = scrollContainer.height(),
                scrollParentHeight = scrollParent.height(),
                currentOffset = scrollContainerTop == "auto" ?
                    0 :
                    parseInt(scrollContainerTop),
                scrollableOffset = currentOffset - offset,
                currentHandleBarOffset = scrollHandleBar.css("top"),
                currentHandleBarOffsetInNumbers = getNumberOrZero(currentHandleBarOffset);
            
            if (scrollableOffset > 0) {
                scrollableOffset = 0;
            } else if (-1 * scrollableOffset > scrollContainerHeight - scrollParentHeight) {
                scrollableOffset = -(scrollContainerHeight - scrollParentHeight);
            }

            if (scrollableOffset != currentOffset) {
                setScrollOffset(scrollableOffset);
                setHandleOffset(-scrollableOffset / getContentToContainerRatio());
            }
        },
        getContentToContainerRatio = function () {
            var scrollContainerHeight = scrollContainer.height(),
                scrollParentHeight = scrollParent.height();
            return scrollContainerHeight / scrollParentHeight;
        },
        setScrollOffset = function (newOffset) {
            scrollContainer.css("top", newOffset);
        },
        setHandleOffset = function (newOffset) {
            scrollHandle.css("top", newOffset);
        },
        reset = function () {
            setScrollOffset(0);
        };

    return {
        activate: activate,
        update: update,
        pan: pan,
        reset: reset
    };
};
