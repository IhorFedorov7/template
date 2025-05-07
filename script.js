
function Animation({ entries, trigger, startClassAnimation, fun, obStop, thresholdValue }) {

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            const elems = entry.target.classList.contains(trigger) ?
                new Array(entry.target) :
                entry.target.querySelectorAll(`.${trigger}`);

            if (!trigger || !elems.length) return

            if (entry.isIntersecting) {
                if (startClassAnimation) {
                    for (let i of elems) {

                        i.classList.add(startClassAnimation);
                    };
                }

                if (fun) {

                    fun(entry.target, entry.isIntersecting);
                }

                if (obStop) {

                    observer.unobserve(entry.target);
                }
            } else {

                for (let i of elems) {

                    i.classList.remove(startClassAnimation);
                };

                if (fun) {

                    fun(entry.target, entry.isIntersectin);
                }
            }
        });
    }, {

        threshold: thresholdValue ? thresholdValue : 0
    });

    if (entries) {

        observer.observe(entries);
    }
};

function menuFooter() {
    const el = document.querySelectorAll("[hrefvalue]");
    const menu = document.querySelector("#footer__menu ul");
    let tegs = "";

    for (let i of el) {

        tegs += `<li><a href="${i.getAttribute('hrefvalue')}">${i.getAttribute('menuvalue')}</a></li>`;
    }

    menu.innerHTML = tegs;
};

document.addEventListener("DOMContentLoaded", () => {
    menuFooter();

    Animation({
        entries: document.querySelector("#animation__home"),
        trigger: "home",
        startClassAnimation: "show__home",
        fun: (el, trigger) => {
            const elem = el.querySelectorAll(".window");
            ;
            elem.forEach((i) => {

                if (trigger) {

                    setTimeout(() => {

                        i.style.fill = "#FEFEA1";
                    }, +i.getAttribute("animationtime") * 500);
                } else {

                    i.style.fill = "";
                }

            });
        },
        obStop: true
    });

    Animation({
        entries: document.querySelector("#animation__phone"),
        trigger: "visualization",
        startClassAnimation: "show-visualization",
        thresholdValue: [0.5],
        obStop: true
    });

    Animation({
        entries: document.querySelector("#anomation__arrow"),
        trigger: "arrow",
        startClassAnimation: "show-arrow",
        thresholdValue: [0.5],
        obStop: true
    });

    Animation({
        entries: document.querySelector("#animation__riadok"),
        trigger: "riadok",
        startClassAnimation: "show-riadok",
        fun: (el, trigger) => {
            const left = el.querySelectorAll('[animationdirection="left"]');
            const right = el.querySelectorAll('[animationdirection="right"]');

            left.forEach((i, index) => {
                if (trigger) {
                    setTimeout(() => {

                        i.style.opacity = 1;
                        i.style.transform = "translateX(0)";
                        i.style.filter = "blur(0)";

                    }, (index + 1) * 500);
                }
            });

            right.forEach((i, index) => {
                if (trigger) {
                    setTimeout(() => {

                        i.style.opacity = 1;
                        i.style.transform = "translateX(0)";
                        i.style.filter = "blur(0)";

                    }, (index + 1) * 500);
                }
            });
        },
        thresholdValue: [0.5],
        obStop: true
    });
});
