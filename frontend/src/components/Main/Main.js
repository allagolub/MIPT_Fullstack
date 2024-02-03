import { Background } from "./Background/Background";
import { Header } from "../Header/Header";
import { MainSearch } from './MainSearch/MainSearch';

export function Main() {
    return (
        <div className="Main">
            <Header />
            <Background />
            <MainSearch />
        </div>
      );
    
}