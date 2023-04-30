import "./global.css";
import Provider from "./Provider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div id="next">
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
