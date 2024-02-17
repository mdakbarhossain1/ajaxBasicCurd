
<script>
document.addEventListener('DOMContentLoaded', function () {
    // Make AJAX request for 'home.section.featured'
    makeAjaxRequest('{{ route('home.section.featured') }}', function (data) {
        document.getElementById('section_featured').innerHTML = data;
        AIZ.plugins.slickCarousel();
    });

    // Make AJAX request for 'home.section.best_selling'
    makeAjaxRequest('{{ route('home.section.best_selling') }}', function (data) {
        document.getElementById('section_best_selling').innerHTML = data;
        AIZ.plugins.slickCarousel();
    });

    // Make AJAX request for 'home.section.home_categories'
    makeAjaxRequest('{{ route('home.section.home_categories') }}', function (data) {
        document.getElementById('section_home_categories').innerHTML = data;
        AIZ.plugins.slickCarousel();
    });

    var page = 1, prev_hH = -1;
    window.addEventListener('scroll', function () {
        // Determine the position of '#ajax_all_product' in the window
        var hT = document.getElementById('ajax_all_product').offsetTop,
            hH = document.getElementById('ajax_all_product').offsetHeight,
            wH = window.innerHeight,
            wS = window.scrollY;

        // Check if the user has scrolled to the bottom of '#ajax_all_product'
        if (wS > (hT + hH - wH) && prev_hH !== hH) {
            loadMoreData();
            prev_hH = hH;
        }
    });

    function loadMoreData() {
        // Make AJAX request for 'home.section.ajax_all'
        makeAjaxRequest('{{ route('home.section.ajax_all') }}?page=' + page, function (data) {
            if (!data) {
                document.getElementById('all_product_loader').innerHTML = "No more Product found!";
                document.getElementById('all_product_loader').classList.remove('spinner-border');
                document.getElementById('all_product_loader').classList.add('text-muted');
                document.getElementById('all_product_loader').style.display = 'block';
                return;
            }

            document.getElementById('ajax-load').style.display = 'none';
            document.getElementById('ajax_all_product').insertAdjacentHTML('beforeend', data);
            page += 1;
        });
    }

    // Check if vendor system activation is true
    @if (\App\BusinessSetting::where('type', 'vendor_system_activation')->first()->value == 1)
        // Make AJAX request for 'home.section.best_sellers'
        makeAjaxRequest('{{ route('home.section.best_sellers') }}', function (data) {
            document.getElementById('section_best_sellers').innerHTML = data;
            AIZ.plugins.slickCarousel();
        });
    @endif

    // Function to make AJAX requests
    function makeAjaxRequest(url, successCallback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                successCallback(xhr.responseText);
            }
        };
        xhr.send('_token=' + encodeURIComponent('{{ csrf_token() }}'));
    }
});

</script>