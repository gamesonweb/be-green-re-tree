class TreeUpgraderModel {
  constructor() {
    this.upgradeData = [
      {
        cost: 10,
        co2PerSecond: 1,
      },
      {
        cost: 25,
        co2PerSecond: 2,
      },
      {
        cost: 60,
        co2PerSecond: 4,
      },
      {
        cost: 150,
        co2PerSecond: 8,
      },
      {
        cost: 375,
        co2PerSecond: 16,
      },
      {
        cost: 950,
        co2PerSecond: 32,
      },
      {
        cost: 2400,
        co2PerSecond: 64,
      },
      {
        cost: 6100,
        co2PerSecond: 128,
      },
      {
        cost: 15500,
        co2PerSecond: 256,
      },
      {
        cost: 39500,
        co2PerSecond: 512,
      },
      {
        cost: 100000,
        co2PerSecond: 1024,
      },
      {
        cost: 250000,
        co2PerSecond: 2048,
      },
      {
        cost: 625000,
        co2PerSecond: 4096,
      },
      {
        cost: 1562500,
        co2PerSecond: 8192,
      },
      {
        cost: 3906250,
        co2PerSecond: 16384,
      },
      {
        cost: 9765625,
        co2PerSecond: 32768,
      },
      {
        cost: 24414062,
        co2PerSecond: 65536,
      },
      {
        cost: 61035156,
        co2PerSecond: 131072,
      },
      {
        cost: 152587890,
        co2PerSecond: 262144,
      },
      {
        cost: 381469725,
        co2PerSecond: 524288,
      },
      {
        cost: 953674316,
        co2PerSecond: 1048576,
      },
      {
        cost: 2384185791,
        co2PerSecond: 2097152,
      },
      {
        cost: 5960464477,
        co2PerSecond: 4194304,
      },
      {
        cost: 14901161194,
        co2PerSecond: 8388608,
      },
      {
        cost: 37252902985,
        co2PerSecond: 16777216,
      },
      {
        cost: 93132257462,
        co2PerSecond: 33554432,
      },
      {
        cost: 232830643653,
        co2PerSecond: 67108864,
      },
      {
        cost: 582076609134,
        co2PerSecond: 134217728,
      },
    ];
  }

  getUpgradeCost(level) {
    return this.upgradeData[level - 1].cost;
  }

  getCo2PerSecond(level) {
    return this.upgradeData[level - 1].co2PerSecond;
  }
}
