$(document).ready(function () {
    mocha.checkLeaks();
    mocha.globals(['jQuery']);
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});

mocha.setup('tdd');

suite('fluxionScrollbar tests', function(){
    var parentElementSelector = ".myContent",
        parentElement = $(parentElementSelector),
        scrollElementSelector = ".scroll-content",
        scrollElement = $(scrollElementSelector),
        myScrollbar = new fluxionScrollbar(parentElementSelector),
        scrollParentSelector = ".fluxionScrollParent",
        scrollContainerSelector = ".fluxionScrollContainer",
        scrollControlsSelector = ".fluxionScrollControls",
        handleContainerSelector = ".fluxionScrollHandleContainer",
        handleSelector = ".fluxionScrollHandle",
        handleBarSelector = ".fluxionScrollHandleBar",
        handleTrackSelector = ".fluxionScrollHandleTrack";

    var getNumberOrDefault = function (input, parser, _default) {
        return isNaN((parser || parseInt)(input)) ? _default : (parser || parseInt)(input);
    };

    var getNumberOrZero = function (input, parser) {
        return getNumberOrDefault(input, parser, 0);
    };

    myScrollbar.activate();
    scrollElement = $(scrollElementSelector);
    
    test('Adds the required markup', function(){
        assert.ok(parentElement.find(scrollParentSelector).length);
        assert.ok(parentElement.find(scrollContainerSelector).length);
        assert.ok(parentElement.find(scrollControlsSelector).length);
        assert.ok(parentElement.find(handleContainerSelector).length);
        assert.ok(parentElement.find(handleBarSelector).length);
        assert.ok(parentElement.find(handleTrackSelector).length);
    });

    test("Hides the scrollbar when not required", function () {
        var content = parentElement.find(scrollElementSelector).html();
        parentElement.find(scrollElementSelector).html("nice");
        myScrollbar.update();
        assert.ok(!parentElement.find(scrollControlsSelector).is(":visible"));
        parentElement.find(scrollElementSelector).html(content);
    });

    test("Shows the scrollbar when required", function () {
        myScrollbar.update();
        assert.ok(parentElement.find(scrollControlsSelector).is(":visible"));
    });

    test("Sizes the handle bar according to the content length", function () {
        var handleHeight = parentElement.find(handleBarSelector).height(),
            trackHeight = parentElement.find(handleTrackSelector).height(),
            containerHeight = parentElement.height(),
            scrollContentHeight = scrollElement.height(),
            handleToTrackRatio = handleHeight / trackHeight,
            containerToContentRatio = containerHeight / scrollContentHeight;
        assert.ok(Math.abs(handleToTrackRatio - containerToContentRatio) < 0.01);
    });

    test("Moves the content up when mouse is dragged", function () {
        var initialContentOffset = $(scrollContainerSelector).css("top"),
            initialContentOffsetInNumbers = getNumberOrZero(initialContentOffset),
            finalContentOffsetInNumbers,
            scrollOffset = 10;

        myScrollbar.pan(scrollOffset);
        finalContentOffsetInNumbers = parseInt($(scrollContainerSelector).css("top"));

        assert.ok(initialContentOffsetInNumbers - finalContentOffsetInNumbers == scrollOffset);
        myScrollbar.pan(-scrollOffset); 
    });

    test("Does not move the content down when mouse is dragged beyond limit", function () {
        var initialContentOffset = $(scrollContainerSelector).css("top"),
            initialContentOffsetInNumbers = getNumberOrZero(initialContentOffset),
            finalContentOffsetInNumbers,
            scrollOffset = -10;

        myScrollbar.pan(scrollOffset);
        finalContentOffsetInNumbers = parseInt($(scrollContainerSelector).css("top"));

        assert.ok(finalContentOffsetInNumbers == 0);
    });

    test("Moves the content down partially when mouse is dragged beyond limit", function () {
        var preContainerOffset,
            postContainerOffset,
            scrollContainer = $(scrollContainerSelector),
            scrollOffset = 10;

        myScrollbar.pan(scrollOffset);

        myScrollbar.pan(-2 * scrollOffset);
        postContainerOffset = getNumberOrZero(scrollContainer.css("top"));
        assert.ok(postContainerOffset == 0);
    });

    test("Does not move the content up when mouse is dragged beyond limit", function () {
        var preContainerOffset,
            postContainerOffset,
            scrollContainer = $(scrollContainerSelector),
            scrollContainerHeight = scrollContainer.height(),
            scrollElementHeight = scrollElement.height(),
            scrollOffset = scrollContainerHeight - $(scrollParentSelector).height();

        myScrollbar.pan(scrollOffset);

        scrollOffset = 10;
        myScrollbar.pan(scrollOffset);
        postContainerOffset = getNumberOrZero(scrollContainer.css("top"));
        assert.ok(-postContainerOffset == scrollContainerHeight - $(scrollParentSelector).height());
    });

    test("Is able to reset the content to top", function () {
        var scrollContainer = $(scrollContainerSelector),
            postContainerOffset,
            scrollOffset = -10;

        myScrollbar.pan(scrollOffset);
        myScrollbar.reset();
        postContainerOffset = getNumberOrZero(scrollContainer.css("top"));
        assert.ok(postContainerOffset == 0);
    });

    test("Moves scrollbar when content is panned", function () {
        var handle = $(handleSelector),
            initialHandleOffset = handle.css("top"),
            initialHandleOffsetInNumbers = getNumberOrZero(initialHandleOffset),
            finalHandleOffsetInNumbers,
            scrollOffset = 10;

        myScrollbar.pan(scrollOffset);
        finalHandleOffsetInNumbers = getNumberOrZero(handle.css("top"));

        assert.ok(initialHandleOffsetInNumbers != finalHandleOffsetInNumbers);
        myScrollbar.pan(-scrollOffset); 
    });

    test("Moves scrollbar in proportion to the content", function () {
        var containerHeight = parentElement.height(),
            scrollContentHeight = scrollElement.height(),
            containerToContentRatio = containerHeight / scrollContentHeight,
            handle = $(handleSelector),
            finalContentOffsetInNumbers,
            finalHandleOffsetInNumbers,
            scrollOffset = 10;

        myScrollbar.reset();    
        myScrollbar.pan(scrollOffset);
        finalHandleOffsetInNumbers = getNumberOrZero(handle.css("top"), parseFloat);
        finalContentOffsetInNumbers = parseInt($(scrollContainerSelector).css("top"));

        assert.ok(Math.abs(finalHandleOffsetInNumbers + containerToContentRatio * finalContentOffsetInNumbers) < 1);
        myScrollbar.pan(-scrollOffset);         
    });
});
