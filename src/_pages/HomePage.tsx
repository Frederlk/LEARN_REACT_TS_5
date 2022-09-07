import React, { FC, useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api";
import RepoCard from "../_components/RepoCard";

const HomePage: FC = () => {
    const [search, setSearch] = useState("");
    const [dropdown, setDropdown] = useState(false);

    const debounced = useDebounce(search);
    const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 2,
        refetchOnFocus: true,
    });
    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();

    useEffect(() => {
        setDropdown(debounced.length > 2 && data?.length! > 0);
    }, [debounced, data]);

    const clickHandle = (username: string) => {
        fetchRepos(username);
        setDropdown(false);
    };

    return (
        <div className="flex justify-center pt-10 mx-auto ">
            {isError && <p className="text-center text-red-600">Something went wrong...</p>}

            <div className="relative w-[560px]">
                <input
                    type="text"
                    placeholder="Search for GitHub username..."
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {dropdown && (
                    <ul className="list-none absolute py-2 px-4 top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
                        {isLoading && <p className="text-center">Loading...</p>}
                        {data?.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => clickHandle(user.login)}
                                className="py-2 px-4 hover:bg-gray-500 hover:text-white transitions-colors cursor-pointer">
                                {user.login}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="container">
                    {areReposLoading && <p className="text-center">Loading...</p>}
                    {repos?.map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
