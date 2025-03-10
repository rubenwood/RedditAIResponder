import Link from "next/link";

function RAIRComment(props: any){
    return (
        <>
            <tr>
                <td>{props.author}</td>
                <td>{props.body}</td>
                <td><Link href={props.link}>Link</Link></td>
            </tr>
        </>
    )
}

function RAIRCommentRows(props: any){
    const formatComments = () =>{
        let formattedCommentList = [];
        for(const comment of props.commentsData.comments){
            formattedCommentList.push(<RAIRComment 
                                        key={`comment-${comment.data.id}`} 
                                        author={comment.data.author} 
                                        body={comment.data.body}
                                        link={`https://reddit.com/${comment.data.permalink}`}
                                         />);
        }
        return formattedCommentList;
    }
    return (<>{formatComments()}</>)
}

export function RAIRCommentsBlock(props: any){
    return (
        <div className='table-container'>
            <div>
            <table className='table'>
                <thead>
                    <tr>
                        <td><b>Author</b></td>
                        <td><b>Comment</b></td>
                        <td><b>Link</b></td>
                    </tr>
                </thead>
                <tbody>
                    <RAIRCommentRows commentsData={props.commentsData} />
                </tbody>
            </table>
        </div>
        </div>
    )
}