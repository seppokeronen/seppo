// V 0.22
// seppo.keronen@gmail.com
//

(() => {

    let oriented = false,
        alpha_base = 0.0, beta_base = 0.0, gamma_base = 0.0,
        alpha = 0.0, beta = 0.0, gamma = 0.0,

        screen_width = window.innerWidth,
        screen_height = window.innerHeight,
        muX = 6.2 * screen_width / 360.0,
        muY = 6.2 * screen_height / 360.0,

        alpha_span = document.getElementById('alpha_span'),
        beta_span  = document.getElementById('beta_span'),
        gamma_span = document.getElementById('gamma_span');
        alpha_meter = document.getElementById('alpha_meter'),
        beta_meter  = document.getElementById('beta_meter'),
        gamma_meter = document.getElementById('gamma_meter'),

        tiles = document.getElementsByClassName("tile");

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
        dx = muX * gamma;
        dy = muY * beta;
        for (const tile of tiles) {
            tile.style.translate = `${dx}px ${dy}px`;
        }
    }
    
    let current_listener = null;

    let permit = (listener) => {
        DeviceOrientationEvent.requestPermission()
        .then(response => {
            if (response == 'granted') {
                if (current_listener) {
                    window.removeEventListener('deviceorientation', current_listener);
                }
                window.addEventListener('deviceorientation', listener);
                current_listener = listener;
            }
        })
        .catch(console.error)
    }

    let initSensors = () => {
        document.getElementById('content').style.display = 'none';
        document.getElementById('info').style.display = 'block';
        permit(rawOrient);
    }
    
    let initContent = () => {
        document.getElementById('info').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        permit(deltaOrient);
    }

    document.getElementById('sensor_button').addEventListener('click', initSensors);
    document.getElementById('content_button').addEventListener('click', initContent);

})()
