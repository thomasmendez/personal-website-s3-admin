const Header = () => {
    return(
        <div className="bg-zinc-500 text-neutral-content p-4 flex justify-between items-center">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl normal-case">Thomas A. Mendez</div>
            <div className="space-x-4 flex items-center">
              <a href="/about" className="btn btn-ghost">About</a>
              <a href="/work" className="btn btn-ghost">Work</a>
              <a href="/skills-tools" className="btn btn-ghost">Skills & Tools</a>
              <details className="relative group">
                <summary className="btn btn-ghost">Projects</summary>
                <ul className="text-zinc-500 absolute hidden space-y-2 group-hover:block bg-white shadow-lg p-2 rounded-lg">
                  <li><a href="/software-engineering" className="btn btn-ghost">Software Engineering</a></li>
                  <li><a href="/vr-ar" className="btn btn-ghost">VR / AR</a></li>
                </ul>
              </details>
              <a href="/resume" className="btn btn-ghost">Resume</a>
              <a href="/storybook" className="btn btn-ghost">Storybook</a>
            </div>
          </div>
        </div>
    )
}

export default Header