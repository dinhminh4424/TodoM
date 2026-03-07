import React from "react";

const Footer = ({ completeTaskCount = 0, activeTaskCount = 0 }) => {
  return (
    <>
      {completeTaskCount + activeTaskCount > 0 && (
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            {completeTaskCount > 0 && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {completeTaskCount > 0 && (
                    <span>
                      {`Tuyệt vời bạn đã hoàn thành 
                      ${completeTaskCount} việc ! vui lòng vui vẻ ${activeTaskCount > 0 && "và mời làm tiếp " + activeTaskCount + " đi !!!"} `}
                    </span>
                  )}
                  {completeTaskCount > 0 && (
                    <span>
                      {`Hãy bắt đầu làm 
                      ${activeTaskCount} lào !`}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
