(() => {

    let oriented = true,
        alpha_base = 0.0, beta_base = 0.0, gamma_base = 0.0,
        alpha = 0.0, beta = 0.0, gamma = 0.0;

    let alpha_span = document.getElementById('alpha_span'),
        beta_span  = document.getElementById('beta_span'),
        gamma_span = document.getElementById('gamma_span');
        alpha_meter = document.getElementById('alpha_meter'),
        beta_meter  = document.getElementById('beta_meter'),
        gamma_meter = document.getElementById('gamma_meter');

    function orient(event) {
        if (oriented === false) {
            alpha_base = event.alpha;
            beta_base  = event.beta;
            gamma_base = event.gamma;
            oriented = true;
        }
        alpha = event.alpha - alpha_base;
        beta = event.beta - beta_base;
        gamma = event.gamma - gamma_base;
        alpha_span.innerHTML = alpha
        beta_span.innerHTML = beta
        gamma_span.innerHTML = gamma
        alpha_meter.value = alpha
        beta_meter.value = beta
        gamma_meter.value = gamma
    }

    var permit = () => {
        DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                window.addEventListener('deviceorientation', orient)
            }
        })
        .catch(console.error)
    }

    let init = () => {
        btn.style.display = 'none';
        document.getElementById('info').style.display = 'block';
        permit();
    }
    let btn = document.getElementById('init');
    btn.addEventListener('click', init);

})()
