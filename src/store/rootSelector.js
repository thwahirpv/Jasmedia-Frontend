export const selectIsLoading = (state) => {
    const slices = ["getAllCategory", "latestPortfolio", "getAllPortfolio", "getAllFeedback", ]
    console.log('staes:', state)
    return slices.some((slice) => state[slice]?.isLoading)
}