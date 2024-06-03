window.addEventListener('hashchange', function() {
    if (!sessionStorage.getItem('authToken') && window.location.hash !== '#login') {
        window.location.hash = '#login';
    }
});
