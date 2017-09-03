// let getFeedback = (trainer) => {
//     return trainer[0].feedback;
// }

// // //probably just used for tqi unless i rework the trainer object schema
// let getData = (trainersObj, data = "tqi", date) => {
//     let tqi, tqiObj = [];
//     for (let i = 0; i < trainersObj.length; i++) {
//         tqi = 0;
//         for (var j = 0, count = 0; j < trainersObj[i].feedback.length; j++) {
//             //if date has been passed as an arg, and the current week does not contian it, skip it.
//             if (!!date && !trainersObj[i].feedback[j].date.includes(date)) {
//                 continue;
//             }
//             tqi += (trainersObj[i].feedback[j][data]);
//             count++;
//         }
//         tqiObj.push(tqi / count);
//     }
//     return tqiObj;
// }

// let getGraphLabels = (trainersObj) => {
//     let labels = [];
//     let trainerAveragesForThisMonth = getAverageScore(trainers)
//     for (let i = 0; i < trainersObj.length; i++) {
//         labels.push(trainersObj[i].name);
//     }
//     return labels;
// }

let getAverageScore = (trainersObj, date) => {

    let trainersAverages = { names: [], results: { kScore: [], rScore: [] } };//[];

    //each trainer
    for (let i = 0; i < trainersObj.length; i++) {
        let rScoretrainerCourseAverages = 0, kScoretrainerCourseAverages = 0;
        //each course/week
        for (var j = 0, rScoreCount = 0, kScoreCount = 0; j < trainersObj[i].feedback.length; j++) {
            //if date has been passed as an arg, and the current week does not contian it, skip it.
            if (date && !trainersObj[i].feedback[j].date.includes(date)) {
                continue;
            }
            //kScore
            let kScoreavgFromWeek = getAverageFromWeek(trainersObj[i].feedback[j].results, "kScore");
            if (kScoreavgFromWeek != -1) {
                kScoretrainerCourseAverages += kScoreavgFromWeek;
                kScoreCount++;
            }
            //rScore
            let rScoreavgFromWeek = getAverageFromWeek(trainersObj[i].feedback[j].results, "rScore");
            if (rScoreavgFromWeek != -1) {
                rScoretrainerCourseAverages += rScoreavgFromWeek;
                rScoreCount++;
            }
        }

        if (rScoreCount || kScoreCount) {
            let kScoretrainerResult = kScoretrainerCourseAverages / kScoreCount;
            let rScoretrainerResult = rScoretrainerCourseAverages / rScoreCount;
            trainersAverages.names.push(trainersObj[i].name);
            trainersAverages.results.kScore.push(kScoretrainerResult);
            trainersAverages.results.rScore.push(rScoretrainerResult);
        }
    }
    return trainersAverages;
}


let getAverageFromWeek = (week, data) => {
    let courseResultAverages = 0, count = 0;
    //each result
    for (let i = 0; i < week.length; i++) {
        if (week[i][data]) {
            courseResultAverages += (week[i][data]);
            count++;
        }
    }
    if (count > 0)
        return courseResultAverages / count;
    else
        return -1;
}


module.exports = {
    getAverageScore
}