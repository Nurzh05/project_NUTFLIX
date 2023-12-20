const useGenres = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";

    const genreIds = selectedGenres.map((genre) => genre.id);       
    return genreIds.reduce((a,b) => a + "," + b);
};

export default useGenres;