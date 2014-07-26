//--------------------------------------------------
//----------fluxion Scrollbar 0.9.2 beta------------
//-----------http://www.teamfluxion.com-------------
//--------------------------------------------------

function fluxionScrollbar(scroller, options) {
    //Internal Variables
    var self = this;
    var isMouseDownOnScroll = false;
    var mouseDownOnScrollY = 0;
    var throttle = 1;
    var throttleTimer;

    //Default input options
    //options.handleScroll = options.handleScroll && true;
    //options.panScroll = options.panScroll && true;
    //options.mouseWheelScroll = options.mouseWheelScroll && true;

    //Internal Functions
    function increaseThrottle() {
        if (throttle < 20) {
            throttle = throttle + 1;
        }
        clearTimeout(throttleTimer);
        throttleTimer = setTimeout(function () { decreaseThrottle(); }, 100);
    };
    function decreaseThrottle() {
        if (throttle > 0) {
            throttle = throttle - 1;
        }
        if (throttle > 1) {
            throttleTimer = setTimeout(function () { decreaseThrottle(); }, 100);
        }
    };
    function getContentToContainerRatio() {
        var contentHeight = parseInt(getVerticalHeight($(scroller).find(".fluxionScrollContainer"))),
                        containerHeight = parseInt(getVerticalHeight($(scroller).find(".fluxionScrollParent")));
        return contentHeight / containerHeight;
    };
    function getMaxScrollValue() {
        var contentHeight = parseInt(getVerticalHeight($(scroller).find(".fluxionScrollContainer"))),
                        containerHeight = parseInt(getVerticalHeight($(scroller).find(".fluxionScrollParent")));
        return contentHeight - containerHeight;
    };
    function showOrHideScrollControls() {
        if (getContentToContainerRatio() <= 1) {
            $(scroller).find(".fluxionScrollControls").hide();
        } else {
            $(scroller).find(".fluxionScrollControls").show();
        }
    };
    function updateHandleSize() {
        var contentToContainerRatio = getContentToContainerRatio(), trackSize, newHandleSize;
        showOrHideScrollControls();

        //Set the new handle size
        trackSize = getVerticalHeight($(scroller).find(".fluxionScrollHandleTrack"));
        newHandleSize = trackSize / contentToContainerRatio;
        $(scroller).find(".fluxionScrollHandle").css("height", newHandleSize);
    };
    function setUpScrollMarkup() {
        $(scroller).css("-moz-user-select", "none");
        $(scroller).css("-webkit-user-select", "none");
        $(scroller).attr("onselectstart", "return false;");

        var scrollContent = $(scroller).html();
        $(scroller).html('<div class="fluxionScrollParent">'
                            + '<div class="fluxionScrollContainer">'
                                + scrollContent
                            + '</div>'
                            + '<div class="fluxionScrollControls">'
                                + '<div class="fluxionScrollHandleContainer">'
                                    + '<div class="fluxionScrollHandle">'
                                        + '<div class="fluxionScrollHandleBar">'
                                        + '</div>'
                                    + '</div>'
                                    + '<div class="fluxionScrollHandleTrack">'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                        + '</div>');
    }

    //Exposed methods
    this.activate = function () {
        setUpScrollMarkup();

        $(scroller).live("mouseover", function (evt) {
            self.performScroll(0);
            showOrHideScrollControls();
        });

        $(scroller).live("mousedown", function (evt) {
            isMouseDownOnScroll = true;
            mouseDownOnScrollY = evt.clientY;
        });

        $(scroller).live("mouseup mouseleave", function () {
            isMouseDownOnScroll = false;
            $(this).removeClass("visible");
        });

        $(scroller).live("mousemove", function (evt) {
            if (isMouseDownOnScroll) {
                var displacement = mouseDownOnScrollY - evt.clientY;
                self.performScroll(displacement);
                mouseDownOnScrollY = evt.clientY;
            }
        });

        $(scroller).live('mousewheel', function (event, delta) {
            delta = parseInt(event.handleObj.handler.arguments[3]);
            increaseThrottle();
            self.performScroll(-1 * throttle * delta);
        });

        $(scroller).find(".fluxionScrollControls").live("mousedown", function (evt) {
            isMouseDownOnScroll = true;
            mouseDownOnScrollY = evt.clientY;
        });

        $(scroller).find(".fluxionScrollControls").live("mouseup mouseleave", function () {
            isMouseDownOnScroll = false;
            $(scroller).removeClass("visible");
        });

        $(scroller).find(".fluxionScrollControls").live("mousemove", function (evt) {
            if (isMouseDownOnScroll) {
                var displacement = mouseDownOnScrollY - evt.clientY;
                self.performScroll(-1 * getContentToContainerRatio() * displacement);
                mouseDownOnScrollY = evt.clientY;
            }
        });

        updateHandleSize();
    };
    this.resetToZero= function () {
        $(scroller).find(".fluxionScrollContainer").css("top", "0px");
        $(scroller).find(".fluxionScrollHandle").css("top", "0px");
        updateHandleSize();
    };
    this.performScroll = function (displacement) {
        var contentToContainerRatio = getContentToContainerRatio(),
            maxScrollValue = getMaxScrollValue(),
            oldScrollOffset,
            newScrollOffset,
            newHandleOffset;

        //Check if there is a scrollbar
        if (contentToContainerRatio <= 1) {
            return;
        }

        //Calculate the scroll offset
        oldScrollOffset = parseFloat($(scroller).find(".fluxionScrollContainer").css("top"));
        newScrollOffset = oldScrollOffset - displacement;

        //Calculate the handle offset
        newHandleOffset = -1 * newScrollOffset / contentToContainerRatio;

        //Validate for top bound
        if (newScrollOffset > 0) {
            newScrollOffset = 0;
        }
        //Validate for bottom bound
        if ((-1 * newScrollOffset) > maxScrollValue) {
            newScrollOffset = -1 * maxScrollValue;
        }

        //Set the offsets
        $(scroller).find(".fluxionScrollContainer").css("top", newScrollOffset);
        $(scroller).find(".fluxionScrollHandle").css("top", newHandleOffset);

        updateHandleSize();
    };

    function getVerticalHeight(theElement) {
        if (isHidden(theElement))
            return 0;
        var value = parseInt($(theElement).css("height")) + parseInt($(theElement).css("padding-top")) + parseInt($(theElement).css("margin-top")) + parseInt($(theElement).css("border-top-width")) + parseInt($(theElement).css("padding-bottom")) + parseInt($(theElement).css("margin-bottom")) + parseInt($(theElement).css("border-bottom-width"));
        return (handleNaN(value));
    }

    function getVerticalHeightExceptSelf(theElement) {
        if (isHidden(theElement))
            return 0;
        var value = parseInt($(theElement).css("padding-top")) + parseInt($(theElement).css("margin-top")) + parseInt($(theElement).css("border-top-width")) + parseInt($(theElement).css("padding-bottom")) + parseInt($(theElement).css("margin-bottom")) + parseInt($(theElement).css("border-bottom-width"));
        return (handleNaN(value));
    }

    function getHorizontalWidth(theElement) {
        if (isHidden(theElement))
            return 0;
        var value = parseInt($(theElement).css("width")) + parseInt($(theElement).css("padding-left")) + parseInt($(theElement).css("margin-left")) + parseInt($(theElement).css("border-left-width")) + parseInt($(theElement).css("padding-right")) + parseInt($(theElement).css("margin-right")) + parseInt($(theElement).css("border-right-width"));
        return (handleNaN(value));
    }

    function getHorizontalWidthExceptSelf(theElement) {
        if (isHidden(theElement))
            return 0;
        var value = parseInt($(theElement).css("padding-left")) + parseInt($(theElement).css("margin-left")) + parseInt($(theElement).css("border-left-width")) + parseInt($(theElement).css("padding-right")) + parseInt($(theElement).css("margin-right")) + parseInt($(theElement).css("border-right-width"));
        return (handleNaN(value));
    }

    function isHidden(theElement) {
        return $(theElement).css("display") == "none" ? true : false;
    }

    function handleNaN(value) {
        return isNaN(value) ? 0 : value;
    }
};
