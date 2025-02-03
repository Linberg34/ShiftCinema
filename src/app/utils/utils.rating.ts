
export function getRatingStars(rating: string): number {
    const numericRating = parseFloat(rating);
    return numericRating / 2;
}

export function getStarFillPercentage(rating: string, index: number): number {
    const numericRating = getRatingStars(rating);
    const fill = numericRating - index;

    if (fill >= 1) {
        return 100;
    } else if (fill > 0) {
        return fill * 100;
    } else {
        return 0;
    }
}

export function getAgeRating(ageRating: string): string {
    const ageRatingMap: { [key: string]: string } = {
        'G': '0+',
        'PG': '6+',
        'PG-13': '12+',
        'R': '16+',
        'NC17': '18+'
    };

    return ageRatingMap[ageRating] || 'N/A';
}
