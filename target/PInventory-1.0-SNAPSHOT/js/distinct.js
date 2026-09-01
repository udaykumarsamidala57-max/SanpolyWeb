document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       OPEN MODAL
    ========================================================= */
    function openSanpolyModal(id) {

        var modal = document.getElementById("sp-modal-" + id);

        if (!modal) {
            console.error("Modal not found: sp-modal-" + id);
            return;
        }

        /* Close any already-open modal */
        document.querySelectorAll(".sp-modal-overlay.active").forEach(function (item) {
            item.classList.remove("active");
        });

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }


    /* =========================================================
       CLOSE MODAL
    ========================================================= */
    function closeSanpolyModal(id) {

        var modal = id
            ? document.getElementById("sp-modal-" + id)
            : null;

        if (modal) {
            modal.classList.remove("active");
        } else {
            document.querySelectorAll(".sp-modal-overlay.active").forEach(function (item) {
                item.classList.remove("active");
            });
        }

        document.body.style.overflow = "";
    }


    /* =========================================================
       CARD CLICK / TOUCH EFFECT
    ========================================================= */
    var distinctCards = document.querySelectorAll(".distinct-card");

    distinctCards.forEach(function (card) {

        card.addEventListener("click", function (event) {

            /* Don't toggle card when Read More is clicked */
            if (event.target.closest(".read-more-btn")) {
                return;
            }

            distinctCards.forEach(function (otherCard) {
                if (otherCard !== card) {
                    otherCard.classList.remove("touch-active");
                }
            });

            card.classList.toggle("touch-active");
        });

    });


    /* =========================================================
       READ MORE BUTTON
    ========================================================= */
    document.addEventListener("click", function (event) {

        var openBtn = event.target.closest(".read-more-btn");

        if (openBtn) {

            event.preventDefault();
            event.stopPropagation();

            var modalId = openBtn.getAttribute("data-modal-id");

            if (modalId) {
                openSanpolyModal(modalId);
            }

            return;
        }


        /* CLOSE BUTTON */
        var closeBtn = event.target.closest(".sp-modal-close");

        if (closeBtn) {

            event.preventDefault();
            event.stopPropagation();

            var closeId = closeBtn.getAttribute("data-close-id");

            closeSanpolyModal(closeId);

            return;
        }


        /* CLOSE WHEN CLICKING OUTSIDE MODAL */
        if (event.target.classList &&
            event.target.classList.contains("sp-modal-overlay")) {

            event.target.classList.remove("active");
            document.body.style.overflow = "";
        }

    });


    /* =========================================================
       ESCAPE KEY
    ========================================================= */
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            document.querySelectorAll(".sp-modal-overlay.active").forEach(function (modal) {
                modal.classList.remove("active");
            });

            document.body.style.overflow = "";
        }

    });

});