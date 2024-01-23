'use client';
// import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Avatar, Button, Headline } from "craftbook";

const MainView: React.FunctionComponent = () => {
  return (
    <div className="main-view">
      <header className="m-12">
        <h2 className="leading-snug tracking-tight font-semibold text-2xl">
          UI Components
        </h2>
      </header>
      <div className="content-container mx-12 my-6 grid gap-6">
        <Card>
          Content in card, without separator and header
        </Card>
        <Card withHeader
          title="Card component demo"
          description="Showing card demo with customization"
        >
          Content in card, without separator and header
        </Card>
        <Card withHeader
          title="Card with main action"
          description="Card with header and main action"
        >
          <Button>
            Button
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default MainView;