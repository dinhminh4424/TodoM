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
                    <p>
                      {`Tuyệt vời bạn đã hoàn thành 
                      ${completeTaskCount} việc ! vui lòng vui vẻ ${activeTaskCount > 0 && "và mời làm tiếp " + activeTaskCount + " đi !!!"} `}
                    </p>
                  )}
                  {completeTaskCount > 0 && (
                    <p>
                      {`Hãy bắt đầu làm 
                      ${activeTaskCount} lào !`}
                    </p>
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
