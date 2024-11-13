import React, { FunctionComponent } from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  LineShareButton,
  LineIcon
} from 'react-share';

interface shareProp {
  url: string;
  justify?:string
}

const ShareComponent: FunctionComponent<shareProp> = ({
  url = "",
  justify="end"
}) => {
  const shareUrl = 'http://golf-encounters.com/read-post/' + url;
  const title: string = 'Check out this awesome website!';

  return (
    <div className={`flex justify-${justify}`}>
      <div>
        <h2 className=''>Share this post</h2>
        <div className='flex items-center gap-2'>
          <FacebookShareButton
            url={shareUrl}
            hashtag="#example"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={title}
            hashtags={['example']}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <LinkedinShareButton
            url={shareUrl}
            title={title}
            summary="This is an example summary"
            source="Example Source"
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={title}

          >
            <EmailIcon size={32} round />
          </EmailShareButton>

          <LineShareButton
            url={shareUrl}
            title={title}
          >
            <LineIcon size={32} round />
          </LineShareButton>
        </div>

      </div>
    </div>

  );
};

export default ShareComponent;
