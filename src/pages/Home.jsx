import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiCopy, BiSearch } from "react-icons/bi";
import Badge from "../components/Badge";
import {
  error_toaster,
  info_toaster,
  warning_toaster,
} from "../utilities/Toaster";
import { IoMenu } from "react-icons/io5";
import { Helmet } from "react-helmet";

export default function Home() {
  const currentUrl = window.location.href;
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search === "") {
      setProfile(null);
    }
  };
  const copyToClipboard = (repo) => {
    if (!repo) return;
    navigator.clipboard
      .writeText(repo)
      .then(() => {
        info_toaster("URL copied to clipboard");
      })
      .catch((err) => {
        error_toaster("Failed to copy URL: ", err);
      });
  };
  const searchUser = async (e) => {
    e.preventDefault();
    try {
      if (!search) {
        setProfile(null);
        return;
      }
      const res = await axios.get(`https://api.github.com/users/${search}`);
      setProfile(res.data);
      fetchUserRepos(search);
    } catch (error) {
      console.error("Error searching user: ", error?.response?.data?.message);
      warning_toaster("User Not Found");
    }
  };

  const fetchUserRepos = async (username) => {
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            client_id: "6491ba4ecdcad7a51073",
            client_secret: "e28c153c9d1ef7b8d3a46090e6c22e50d159876f",
            sort: "created:asc",
            per_page: 3,
          },
        }
      );
      setRepos(res.data);
    } catch (error) {
      console.error("Error fetching repositories: ", error);
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href={currentUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="twitter:url" content={currentUrl} />
      </Helmet>
      <div className="min-h-screen bg-gray-800">
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="w-11/12 md:w-4/5 flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src="/logo.png" className="h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                GitHub Finder
              </span>
            </a>
            <button className="block sm:hidden">
              <IoMenu size={32} />
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <Link
                    to="/"
                    target="_blank"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    E-Commerce
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <section className="w-11/12 md:w-4/5 mx-auto py-4">
          <div className="space-y-4">
            <h1 className="text-white font-bold sm:text-4xl text-3xl">
              Search Github Users
            </h1>
            <h2 className="text-white text-xl sm:text-2xl">
              Enter a username too fetch profile info and repos data
            </h2>
            <form
              onSubmit={searchUser}
              className="flex sm:flex-row flex-col items-center gap-2"
            >
              <div className="relative">
                <div className="absolute top-1/2 left-3 -translate-y-[50%]">
                  <BiSearch className="text-theme-green-2" />
                </div>
                <input
                  type="search"
                  className="py-2 px-10 rounded w-[320px] font-normal text-base placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                  placeholder="Github Username...."
                  value={search}
                  onChange={handleSearch}
                />
              </div>
              <button
                type="submit"
                className="py-2 px-5 bg-[#E13743] text-white rounded sm:w-auto w-full"
              >
                Search
              </button>
            </form>

            {profile && search !== "" && (
              <div className="bg-white text-black rounded-md">
                <div className="bg-gray-300 p-5 rounded-t-md">
                  <h2 className="text-2xl mb-2">
                    {profile?.name || profile?.login} &nbsp;
                    <span className="inline-flex items-center justify-center w-7 h-7 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill="currentColor"
                          d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                        />
                        <path
                          fill="#fff"
                          d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                        />
                      </svg>
                    </span>
                  </h2>
                  <p className="mb-2">{profile?.bio}</p>
                </div>
                <div className="grid sm:grid-cols-4 p-5 gap-x-5">
                  <div className="sm:col-span-1">
                    <div className="flex flex-col gap-4">
                      <figure>
                        <img
                          className="rounded-lg border border-gray-600 shadow-md"
                          src={profile?.avatar_url}
                          alt="avatar"
                        />
                      </figure>
                      <Link
                        to={profile?.html_url}
                        target="_blank"
                        className="py-2 px-5 bg-[#E13743] text-white text-center rounded sm:w-auto w-full"
                      >
                        View Profile
                      </Link>
                      <div>
                          <img
                            className="w-full"
                            src={`https://github-readme-stats.vercel.app/api?username=${profile?.login}&show_icons=true&count_private=true&theme=tokyonight&layout=compact&hide=html`}
                            alt={profile?.login}
                          />
                        </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3 px-5  py-5 sm:py-0 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        css={"bg-green-100 text-green-800"}
                        title={`Public Repo's : ${profile?.public_repos}`}
                      />
                      <Badge
                        css={"bg-yellow-100 text-yellow-800"}
                        title={`Public Gist's : ${profile?.public_gists}`}
                      />
                      <Badge
                        css={"bg-indigo-100 text-indigo-800"}
                        title={`Followers : ${profile?.followers}`}
                      />
                      <Badge
                        css={"bg-purple-100 text-purple-800"}
                        title={`Following : ${profile?.following}`}
                      />
                    </div>
                    <div className="border rounded-md p-3">
                      <div>
                        <h4>
                          <strong>Company:</strong>{" "}
                          {profile?.company || "No Data"}
                        </h4>
                        <h4>
                          <strong>Website/Blog:</strong>{" "}
                          {profile?.blog || "No Data"}
                        </h4>
                        <h4>
                          <strong>Location:</strong>{" "}
                          {profile?.location || "No Data"}
                        </h4>
                        <h4>
                          <strong>Member Since:</strong>{" "}
                          {profile?.created_at || "No Data"}
                        </h4>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold"> Pin Repos</h2>
                    {repos?.length > 0 &&
                      repos?.map((repo) => (
                        <div className="border rounded-md p-3" key={repo.id}>
                          <div className="grid sm:grid-cols-3 items-center gap-3">
                            <div className="flex flex-col">
                              <div className="flex gap-x-2">
                                <h4 className="font-semibold"> Name :</h4>
                                <span>{repo?.name}</span>
                              </div>
                              <div className="flex gap-x-2">
                                <h4 className="font-semibold">
                                  {" "}
                                  Description :
                                </h4>
                                <span>
                                  {repo?.description?.substring(0, 10) ||
                                    "No Data"}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-x-2 ">
                              <input
                                type="text"
                                value={repo?.clone_url || ""}
                                readOnly
                                ref={inputRef}
                                className="sm:w-72 bg-gray-300 py-1 px-4 rounded font-normal text-xs placeholder:text-black placeholder:text-opacity-40 focus:outline-none"
                              />
                              <button
                                onClick={() => copyToClipboard(repo?.clone_url)}
                              >
                                <i className="fas fa-copy"></i>
                                <BiCopy />
                              </button>
                              {/* {repo?.clone_url} */}
                            </div>
                            <div className="flex sm:justify-end ">
                              <Link
                                className="py-1 sm:py-2 px-3 sm:px-5 bg-[#E13743] text-white text-center rounded sm:w-auto w-full"
                                to={repo.html_url}
                                target="_blank"
                              >
                                Visit Repo
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
