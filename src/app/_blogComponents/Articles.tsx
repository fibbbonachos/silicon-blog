"use client";

import useSWR from "swr";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Article from "./Article";
import { query, articlesFetcher } from "../api/fetchArticles";

export interface Node {
    title: string;
    brief: string;
    slug?: string;
    coverImage: {
        url: string;
    };
}

type ResultsObject = {
    node: Node;
};

const Articles = () => {
    const { data, error } = useSWR(query, articlesFetcher);
    if (error) return <p>Error</p>;
    // if (!data) return <Skeleton />;

    return data ? (
        <div>
            {data.publication.posts.edges.map(
                (result: ResultsObject, index: number) => {
                    return (
                        <div
                            key={index}
                            className="flex justify-center drop-shadow-lg"
                        >
                            <div className="w-full md:w-1/2 2xl:w-[25%] m-6">
                                <Link href={`/blog/${result.node.slug}`}>
                                    <Article
                                        title={result.node.title}
                                        brief={result.node.brief}
                                        coverImage={result.node.coverImage.url}
                                    />
                                </Link>
                            </div>
                        </div>
                    );
                }
            )}
        </div>
    ) : (
        <div className="text-center">
            <Skeleton
                width={"50%"}
                height={400}
                baseColor="#171717"
                highlightColor="#292929"
                duration={0.5}
                count={6}
            />
        </div>
    );
};

export default Articles;
