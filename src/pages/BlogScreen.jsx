import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteBlog, getBlogs } from '../api/usersApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const DashboardBlogScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [expandedContent, setExpandedContent] = useState({});

    const limit = 10;

    const { data, error, isLoading } = useQuery(
        ['blogs', searchQuery, page],
        () => getBlogs(searchQuery, page, limit));

    const queryClient = useQueryClient();

    const deleteBlogMutation = useMutation(deleteBlog, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs');
        },
    });

    const handleDelete = async (id) => {
        setDeleteTargetId(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (deleteTargetId) {
            await deleteBlogMutation.mutateAsync(deleteTargetId);
            setDeleteTargetId(null);
            setShowDeleteConfirm(false);
        }
    };

    const cancelDelete = () => {
        setDeleteTargetId(null);
        setShowDeleteConfirm(false);
    };


    const navigate = useNavigate();

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleBlog = () => {
        navigate('/addBlog');
    }

    return (
        <>
            <div className="flex items-center mt-4 mb-8">
                <button
                    onClick={handleBlog}
                    className="bg-primary-500 text-white py-2 px-4 rounded"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Blog
                </button>
                <div className="w-72 ml-4">
                    <input
                        type="text"
                        placeholder="Search by Blog Title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 w-full rounded-lg border border-gray-400 focus:outline-none focus:border-primary-700"
                    />
                </div>
            </div>
            {isLoading ? (
                <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
                    <span className="loading-text">Loading...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(!data?.blogs || !Array.isArray(data?.blogs)) ? (
                        <div className="col-span-full flex justify-center items-center h-48 bg-slate-100 rounded-lg shadow-md mx-2">
                            <p className="text-gray-500">No Blogs Available</p>
                        </div>
                    ) : (
                        data?.blogs?.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-lg shadow-md p-4 mx-2">
                                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                                <p className="text-gray-600"  style={{ maxHeight: expandedContent[blog._id] ? 'none' : '10em', overflow: 'hidden' }}>{blog.content}</p>
                                {!expandedContent[blog._id] && (
                                    <button className='text-black' onClick={() => setExpandedContent(prevState => ({ ...prevState, [blog._id]: true }))}>Show More</button>
                                )}
                                {expandedContent[blog._id] && (
                                    <button className='text-black' onClick={() => setExpandedContent(prevState => ({ ...prevState, [blog._id]: false }))}>Show Less</button>
                                )}
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="mt-2 flex items-center text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="mr-1" />
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
            <div className="pagination-container flex justify-center items-center mt-4">
                <button
                    onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={page === 1}
                    className="bg-primary-500 text-white px-4 py-2 rounded-l hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="px-4">{page}</span>
                <button
                    onClick={() => setPage(prevPage => prevPage + 1)}
                    disabled={!data?.blogs || data?.blogs.length === 0 || data?.blogs.length < limit}
                    className="bg-primary-500 text-white px-4 py-2 rounded-r hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <p>Are you sure you want to delete this blog?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardBlogScreen;