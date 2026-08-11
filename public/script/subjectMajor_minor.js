let major_minor = [
    {
        computerscience: [
            {
                nameofsubject: "MAJOR-PAPER-ONE",
                nameofmajor_minor: "major_one",
                nameOfchapter: "Digital Logic and Circuit Design "
            },
            {
                nameofsubject: "MAJOR-PAPER-TWO",
                nameofmajor_minor: "major_two",
                nameOfchapter: "Object Oriented Programming "
            }, {
                nameofsubject: "MINOR-PAPER-ONE",
                nameOfchapter: "OpticsIT Tools and Applications(voc)",
                nameofmajor_minor: "minor_one",
            }
        ]
    },

    {
        physics: [
            {
                nameofsubject: "MAJOR-PAPER-ONE",
                nameOfchapter: " Wave & Wave Optics ",
                nameofmajor_minor: "major_one",
            },
            {
                nameofsubject: "MAJOR-PAPER-TWO",
                nameOfchapter: " Physics of Semiconductors and Devices",
                nameofmajor_minor: "major_two",
            }, {
                nameofsubject: "MINOR-PAPER-ONE",
                nameOfchapter: "Applied Electronics and Fiber Optics(Vocational)",
                nameofmajor_minor: "minor_one",
            }
        ]
    }, {
        statistics: [
            {
                nameofsubject: "MAJOR-PAPER-ONE",
                nameOfchapter: "Basics of Probability Distributions",
                nameofmajor_minor: "major_one",
            },
            {
                nameofsubject: "MAJOR-PAPER-TWO",
                nameOfchapter: "Sampling Distributions",
                nameofmajor_minor: "major_two",
            }, {
                nameofsubject: "MINOR-PAPER-ONE",
                nameOfchapter: " Connecting Data with Probability Models",
                nameofmajor_minor: "minor_one",
            }
        ]
    }, {
        math: [
            {
                nameofsubject: "MAJOR-PAPER-ONE",
                nameOfchapter: "Linear Algebra",
                nameofmajor_minor: "major_one",
            },
            {
                nameofsubject: "MAJOR-PAPER-TWO",
                nameOfchapter: "Analysis",
                nameofmajor_minor: "major_two",
            }, {
                nameofsubject: "MINOR-PAPER-ONE",
                nameOfchapter: "Python for Mathematical Applications((VOC))",
                nameofmajor_minor: "minor_one",
            }
        ]
    }, {
        chemistry: [
            {
                nameofsubject: "MAJOR-PAPER-ONE",
                nameOfchapter: "Inorganic-I",
                nameofmajor_minor: "major_one",
            },
            {
                nameofsubject: "MAJOR-PAPER-TWO",
                nameOfchapter: "Organic-I",
                nameofmajor_minor: "major_two",
            }, {
                nameofsubject: "MINOR-PAPER-ONE",
                nameOfchapter: "Physical-I",
                nameofmajor_minor: "minor_one",
            }
        ]
    }, {
        geologie: [
            {
                nameofsubject: "MAJOR-PAPER-ONE",
                nameOfchapter: " Physical Geology",
                nameofmajor_minor: "major_one",
            },
            {
                nameofsubject: "MAJOR-PAPER-TWO",
                nameOfchapter: " Elementary Structural Geology ",
                nameofmajor_minor: "major_two",
            }, {
                nameofsubject: "MINOR-PAPER-ONE",
                nameOfchapter: "Minerals and Earth Material (VOC)",
                nameofmajor_minor: "minor_one",
            }
        ]
    }
];

let container = document.getElementById("main-other-major-minor");
// Backend se aaya subject name
let subjectName = data.name;
// Matching subject find karo
let subjectData = major_minor.find(
    item => item[subjectName]
);

// Agar subject nahi mila
if (!subjectData) {
    container.innerHTML = `
        <h2>Subject not found</h2>
    `;
}
// console.log(container);
// console.log(subjectData[subjectName][0]);
// // Subject mil gaya
else {
    // Har paper ko HTML mein display karo
    subjectData[subjectName].forEach(subject => {
        container.innerHTML += `
            <a href="/chapter/Third?name=${subjectName}&major_minor=${subject.nameofmajor_minor}">
                <div class="other-major-minor">
                    <h3>
                        ${subject.nameofsubject}
                    </h3>
                <span> <b> ${subject.nameOfchapter}</b> </span>
                    <h5>
                        FOR VIEW NOTES CLICK ME
                    </h5>
                </div>
            </a>
        `;
    });
}
// <h4>
//     <b>NAME OF PAPER :</b>
// </h4>