import { FC } from "react";
import { useAppSelector } from "../hooks/useAppSelector";

const FavouritesPage: FC = () => {
    const { favourites } = useAppSelector((state) => state.github);

    if (favourites.length === 0) return <p className="text-center">No items.</p>;

    return (
        <div className="flex justify-center pt-10 mx-auto ">
            <ul className="list-none">
                {favourites.map((f) => (
                    <li key={f} className="px-5 py-2 my-2">
                        <a href={f} target="_blank" rel="noreferrer">
                            {f}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavouritesPage;
