class Utils {
  public static crossOver (val1: number[], val2: number[]) {
    return (
      val1[val1.length - 2] < val2[val2.length - 2] &&
      val1[val1.length - 1] >= val2[val2.length - 1]
    )
  }

  public static crossUnder (val1: number[], val2: number[]) {
    return (
      val1[val1.length - 2] > val2[val2.length - 2] &&
      val1[val1.length - 1] <= val2[val2.length - 1]
    )
  }
}

export default Utils
