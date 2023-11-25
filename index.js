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

        function rawOrient(event) {
            alpha = event.alpha;
            beta = event.beta;
            gamma = event.gamma;
            alpha_span.innerHTML = alpha
            beta_span.innerHTML = beta
            gamma_span.innerHTML = gamma
            alpha_meter.value = alpha
            beta_meter.value = beta
            gamma_meter.value = gamma
        }
    
        function deltaOrient(event) {
            if (oriented === false) {
                alpha_base = event.alpha;
                beta_base  = event.beta;
                gamma_base = event.gamma;
                oriented = true;
            }
            alpha = event.alpha - alpha_base;
            beta = event.beta - beta_base;
            gamma = event.gamma - gamma_base;
        }
    
    let permit = (listener) => {
        DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                window.addEventListener('deviceorientation', listener)
            }
        })
        .catch(console.error)
    }

    let initSensors = () => {
        init.style.display = 'none';
        document.getElementById('info').style.display = 'block';
        permit(rawOrient);
    }
    
    let initContent = () => {
        init.style.display = 'none';
        document.getElementById('content').style.display = 'block';
        permit(deltaOrient);
    }
    
    let init = document.getElementById('init'),
        sbtn = document.getElementById('sensor_button'),
        cbtn = document.getElementById('content_button');
    sbtn.addEventListener('click', initSensors);
    cbtn.addEventListener('click', initContent);

})()
