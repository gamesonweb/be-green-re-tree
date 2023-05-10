class MilestoneController {
    constructor(gameGui) {
        this.gameGui = gameGui;
        this.milestones = [
            { level: 0, reached: false },
            { level: 5, reached: false },
            { level: 9, reached: false },
            { level: 12, reached: false },
            { level: 17, reached: false },
            { level: 21, reached: false },
        ];
        this.milestoneTexts = {
            0: "You just arrived on a deserted island with dead trees. Do your best to reforest it!",
            5: "Great start! You've reached Level 5. Keep planting trees and watch your forest grow!",
            9: "Impressive! Your trees have reached Level 9. Continue your efforts to make the island greener.",
            12: "Amazing work! Your trees are now Level 12. The island's transformation is well underway.",
            17: "Incredible progress! Your trees have reached Level 17. The once deserted island is now a thriving forest.",
            21: "Outstanding achievement! You've reached Level 21. Your commitment has turned the island into a lush, green paradise.",
        };        
    }

    checkForMilestones(treeLevel) {
        this.milestones.forEach((milestone) => {
            if (treeLevel === milestone.level && !milestone.reached) {
                milestone.reached = true;
                console.log(`New milestone reached: Level ${milestone.level}`);

                // Get a random question from the CSV file
                let question = QuestionsModel.get_random();
                console.log(question);

                this.gameGui.showMilestoneMessage(question);
            }
        });
    }

    loadMilestones(trees) {
        const highestTreeLevel = Math.max(...trees.map(tree => tree.level));
        
        this.milestones.forEach(milestone => {
            if (highestTreeLevel >= milestone.level) {
                milestone.reached = true;
            }
        });
    }
}
