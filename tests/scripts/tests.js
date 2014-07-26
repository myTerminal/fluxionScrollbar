$(document).ready(function () {
    var currentScrollbarInstance = new fluxionScrollbar(".myContent");
    currentScrollbarInstance.activate();

    mocha.checkLeaks();
    mocha.globals(['jQuery']);
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});

mocha.setup('tdd');

suite('Test suite', function(){
    setup(function(){
	// ...
    });
    
    suite('Test sub-suite', function(){
	test('True is equal to true', function(){
	    assert.equal(true, true, "True is always true");
	});
    });
});
