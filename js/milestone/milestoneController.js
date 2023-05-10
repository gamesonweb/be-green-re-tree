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
