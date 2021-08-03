class Random {
  static randomInt(startInclusive, endExclusive) {
    Random.#validateRange(startInclusive, endExclusive);

    startInclusive = Math.ceil(startInclusive);

    return Math.floor(Math.random() * (endExclusive - startInclusive)) + startInclusive;
  }

  static #validateRange(startInclusive, endExclusive) {
    if (startInclusive >= endExclusive) {
      throw new Error(
        `startInclusive: ${startInclusive}가 endExclusive: ${endExclusive}보다 같거나 클 수 없습니다.`
      );
    }
  }

  static randomPositive(startInclusive, endExclusive) {
    Random.#validateRange(startInclusive, endExclusive);
    Random.#validatePositiveRange(startInclusive, endExclusive);

    startInclusive = Math.ceil(startInclusive);

    return Math.floor(Math.random() * (endExclusive - startInclusive)) + startInclusive;
  }

  static #validatePositiveRange(startInclusive, endExclusive) {
    if (startInclusive <= 0 || endExclusive <= 0) {
      throw new Error(
        `startInclusive: ${startInclusive}, endExclusive: ${endExclusive}는 양수이어야 합니다.`
      );
    }
  }

  static notDuplicatedRandomInt(startInclusive, endExclusive, count) {
    Random.#validateIntRange(startInclusive, endExclusive, count);

    const randomInt = [];

    for (let i = startInclusive; i < endExclusive; i++) {
      randomInt.push(i);
    }

    return Random.shuffle(randomInt).slice(0, count);
  }

  static #validateIntRange(startInclusive, endExclusive, count) {
    if (count < 0) {
      throw new Error(`count: ${count}는 보다 작을 수 없습니다.`);
    }

    if (endExclusive - startInclusive < count) {
      throw new Error(
        `count: ${count}가 (endExclusive - startInclusive): ${
          endExclusive - startInclusive
        } 보다 같거나 작아야합니다.`
      );
    }
  }

  static shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  static pick(array) {
    Random.#validateEmptyArray(array);

    return array[Random.randomInt(0, array.length)];
  }

  static #validateEmptyArray(array) {
    if (array.length === 0) {
      throw new Error(`입력한 배열은 최소 1개 이상의 원소를 가져야 합니다.`);
    }
  }
}

export default Random;
