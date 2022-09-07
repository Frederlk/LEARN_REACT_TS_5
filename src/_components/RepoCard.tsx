import { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useAppSelector";
import { IRepo } from "../models/models";

const RepoCard = ({ repo }: { repo: IRepo }) => {
    const { addFavourite, removeFavourite } = useActions();
    const { favourites } = useAppSelector((state) => state.github);
    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addFavourite(repo.html_url);
        setIsFav(true);
    };

    const removeFromFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        removeFavourite(repo.html_url);
        setIsFav(false);
    };

    return (
        <a
            href={repo.html_url}
            rel="noreferrer"
            target="_blank"
            className="block border py-3 px-5 rounded mb-2 hover: shadow-md hover:bg-gray-100 transition-color">
            <h2 className="text-lg font-bold">{repo.full_name}</h2>
            <p className="text-sm">
                Forks: <span className="font-bold mr-2">{repo.forks}</span>
                Watchers: <span className="font-bold">{repo.watchers}</span>
            </p>
            <p className="text-sm font-thin">{repo?.description}</p>

            {isFav ? (
                <button
                    type="button"
                    onClick={removeFromFavourites}
                    className="mt-5 py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all">
                    Remove From Favourites
                </button>
            ) : (
                <button
                    type="button"
                    onClick={addToFavourite}
                    className="mt-5 py-2 mr-4 px-4 bg-yellow-400 rounded hover:shadow-md transition-all">
                    Add To Favourites
                </button>
            )}
        </a>
    );
};

export default RepoCard;
