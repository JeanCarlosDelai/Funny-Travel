const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="https://store.steampowered.com/"></a>
                <img src="https://pa1.narvii.com/6758/4ab996805dab9ff0c2bf4e81929eec9f86909b8a_hq.gif" width="50" height="50" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="navbar-brand" href="/jogos">Jogos</a>
                        <a className="navbar-brand" href="/addJogo">Adicionar Jogo</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navigation;