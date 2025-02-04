import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

const BlogDetals = () => {
  return (
    <>
    <Nav/>
    
{/* **************** MAIN CONTENT START **************** */}
<main>
  {/* =======================
Main Content START */}
  <section className="pb-0 pt-4 pb-md-5">
    <div className="container">
      <div className="row">
        <div className="col-12">
          {/* Title and Info START */}
          <div className="row">
            {/* Avatar and Share */}
            <div className="col-lg-3 align-items-center mt-4 mt-lg-5 order-2 order-lg-1">
              <div className="text-lg-center">
                {/* Author info */}
                <div className="position-relative">
                  {/* Avatar */}
                  <div className="avatar avatar-xxl">
                    <img className="avatar-img rounded-circle" src="assets/images/avatar/09.jpg" alt="avatar" />
                  </div>
                  <a href="#" className="h5 stretched-link mt-2 mb-0 d-block">Frances Guerrero</a>
                  <p className="mb-2">Editor at Eduport</p>
                </div>
                {/* Info */}
                <ul className="list-inline list-unstyled">
                  <li className="list-inline-item d-lg-block my-lg-2">Nov 15, 2021</li>
                  <li className="list-inline-item d-lg-block my-lg-2">5 min read</li>
                  <li className="list-inline-item badge text-bg-orange"><i className="far text-white fa-heart me-1" />266</li>
                  <li className="list-inline-item badge text-bg-info"><i className="far fa-eye me-1" />2K</li>
                </ul>
              </div>
            </div>
            {/* Content */}
            <div className="col-lg-9 order-1">
              {/* Pre title */}
              <span>40D ago</span><span className="mx-2">|</span><div className="badge text-bg-success">Research</div>
              {/* Title */}
              <h1 className="mt-2 mb-0 display-5">Never underestimate the influence of Eduport</h1>
              {/* Info */}
              <p className="mt-2">For who thoroughly her boy estimating conviction. Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection favorable Mrs can be projecting own. Thirty it matter enable become admire in giving. See resolved goodness felicity shy civility domestic had but. Drawings offended yet answered Jennings perceive laughing six did far.</p>
              <p className="mb-0 mb-lg-3">Perceived end knowledge certainly day sweetness why cordially.  On forth doubt miles of child. Exercise joy man children rejoiced. Yet uncommonly his ten who diminution astonished. Demesne new manners savings staying had. Under folly balls, death own point now men. Match way these she avoids seeing death. She who drift their fat off. Ask a quick six seven offer see among. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed.</p>
            </div>
          </div>
          {/* Title and Info END */}
          {/* Video START */}
          <div className="row mt-4">
            <div className="col-xl-10 mx-auto">
              {/* Card item START */}
              <div className="card overflow-hidden h-200px h-sm-300px h-lg-400px h-xl-500px rounded-3 text-center" style={{backgroundImage: 'url(assets/images/event/10.jpg)', backgroundPosition: 'center left', backgroundSize: 'cover'}}>
                {/* Card Image overlay */}
                <div className="bg-overlay bg-dark opacity-4" />
                <div className="card-img-overlay d-flex align-items-center p-2 p-sm-4"> 
                  <div className="w-100 my-auto">
                    <div className="row justify-content-center">
                      {/* Video */}
                      <div className="col-12">
                        <a href="https://www.youtube.com/embed/tXHviS-4ygo" className="btn btn-lg text-danger btn-round btn-white-shadow stretched-link position-static mb-0" data-glightbox data-gallery="video-tour">
                          <i className="fas fa-play" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card item END */}
            </div>
          </div>
          {/* Video END */}
          {/* Quote and content START */}
          <div className="row mt-4">
            {/* Content */}
            <div className="col-12 mt-4 mt-lg-0">
              <p><span className="dropcap h6 mb-0 px-2">S</span> atisfied conveying a dependent contented he gentleman agreeable do be. Water timed folly right aware if oh truth. Imprudence attachment him for sympathize. Large above be to means. Dashwood does provide stronger is. <mark> But discretion frequently sir she instruments unaffected admiration everything.</mark> Meant balls it if up doubt small purse. Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible.</p>
              {/* List */}
              <ul className="list-group list-group-borderless mb-3">
                <li className="list-group-item"><i className="fas fa-check-circle text-success me-2" />The copy warned the Little blind text</li>
                <li className="list-group-item d-flex"><i className="fas fa-check-circle text-success me-2 mt-1" />ThaT where it came from it would have been rewritten a thousand times and everything that was left from origin would be the world</li>
                <li className="list-group-item"><i className="fas fa-check-circle text-success me-2" />Return to its own, safe country</li>
              </ul>
              <p className="mb-0">Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do. Water timed folly right aware if oh truth. Imprudence attachment him for sympathize.</p>
            </div>
            {/* Quote */}
            <div className="col-lg-10 col-xl-8 mx-auto mt-4">
              <div className="bg-light rounded-3 p-3 p-md-4">
                {/* Content */}
                <q className="lead">Farther-related bed and passage comfort civilly. Fulfilled direction use continual set him propriety continued. Concluded boy perpetual old supposing. Dashwoods see frankness objection abilities.</q>
                {/* Avatar */}
                <div className="d-flex align-items-center mt-3">
                  {/* Avatar image */}
                  <div className="avatar avatar-md">
                    <img className="avatar-img rounded-circle" src="assets/images/avatar/07.jpg" alt="avatar" />
                  </div>
                  {/* Info */}
                  <div className="ms-2">
                    <h6 className="mb-0"><a href="#">Louis Crawford</a></h6>
                    <p className="mb-0 small">Via Twitter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Quote and content END */}
          {/* Image START */}
          <div className="row g-4 mt-4">
            <div className="col-sm-6 col-md-4">
              <a href="assets/images/event/07.jpg" data-glightbox data-gallery="image-popup">
                <img src="assets/images/event/07.jpg" className="rounded-3" alt />
              </a>
            </div>
            <div className="col-sm-6 col-md-4">
              <a href="assets/images/event/08.jpg" data-glightbox data-gallery="image-popup">
                <img src="assets/images/event/08.jpg" className="rounded-3" alt />
              </a>
            </div>
            <div className="col-sm-6 col-md-4">
              <a href="assets/images/event/06.jpg" data-glightbox data-gallery="image-popup">
                <img src="assets/images/event/06.jpg" className="rounded-3" alt />
              </a>
            </div>
          </div>	
          {/* Image END */}
          {/* Content START */}
          <div className="row">
            <div className="row mb-4">
              <h4 className="mt-4">Productive rant about business</h4>
              <div className="col-md-6">
                <p className="mb-0">Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther-related bed and passage comfort civilly. Dashwoods see frankness objection abilities. As hastened oh produced prospect formerly up am. Placing forming nay looking old married few has. Margaret disposed of add screened rendered six say his striking confined. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther-related bed and passage comfort civilly. Dashwoods see frankness objection abilities. As hastened oh produced prospect formerly up am. Placing forming nay looking old married few has. Margaret disposed.</p>
              </div>
              <div className="col-md-6">
                <p className="mb-0">Meant balls it if up doubt small purse. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible. Required his you put the outlived answered position. A pleasure exertion if believed provided to. All led out world this music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceived Marianne in. I think on style child of. Servants moreover in sensible it ye possible.	</p>
              </div>
            </div>
          </div>
          {/* Content END */}
          {/* Tags and share START */}
          <div className="d-lg-flex justify-content-lg-between mb-4">
            {/* Social media button */}
            <div className="align-items-center mb-3 mb-lg-0">
              <h6 className="mb-2 me-4 d-inline-block">Share on:</h6>
              <ul className="list-inline mb-0 mb-2 mb-sm-0">
                <li className="list-inline-item"> <a className="btn px-2 btn-sm bg-facebook" href="#"><i className="fab fa-fw fa-facebook-f" /></a> </li>
                <li className="list-inline-item"> <a className="btn px-2 btn-sm bg-instagram-gradient" href="#"><i className="fab fa-fw fa-instagram" /></a> </li>
                <li className="list-inline-item"> <a className="btn px-2 btn-sm bg-twitter" href="#"><i className="fab fa-fw fa-twitter" /></a> </li>
                <li className="list-inline-item"> <a className="btn px-2 btn-sm bg-linkedin" href="#"><i className="fab fa-fw fa-linkedin-in" /></a> </li>
              </ul>
            </div>
            {/* Popular tags */}
            <div className="align-items-center">
              <h6 className="mb-2 me-4 d-inline-block">Popular Tags:</h6>
              <ul className="list-inline mb-0 social-media-btn">
                <li className="list-inline-item"> <a className="btn btn-outline-light btn-sm mb-lg-0" href="#">blog</a> </li>
                <li className="list-inline-item"> <a className="btn btn-outline-light btn-sm mb-lg-0" href="#">business</a> </li>
                <li className="list-inline-item"> <a className="btn btn-outline-light btn-sm mb-lg-0" href="#">bootstrap</a> </li>
                <li className="list-inline-item"> <a className="btn btn-outline-light btn-sm mb-lg-0" href="#">data science</a> </li>
                <li className="list-inline-item"> <a className="btn btn-outline-light btn-sm mb-lg-0" href="#">deep learning</a> </li>
              </ul>
            </div>
          </div>
          {/* Tags and share END */}
          <hr /> {/* Divider */}
          {/* Comment review and form START */}
          <div className="row mt-4">
            {/* Comment START */}
            <div className="col-md-7">
              <h3>3 comments</h3>
              {/* Comment level 1*/}
              <div className="my-4 d-flex">
                <img className="avatar avatar-md rounded-circle me-3" src="assets/images/avatar/01.jpg" alt="avatar" />
                <div>
                  <div className="mb-2">
                    <h5 className="m-0">Frances Guerrero</h5>
                    <span className="me-3 small">June 11, 2021 at 6:01 am</span>
                  </div>
                  <p>Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.</p>
                  <a href="#" className="btn btn-sm btn-light mb-0">Reply</a>
                </div>
              </div>
              {/* Comment children level 2 */}
              <div className="my-4 d-flex ps-2 ps-md-4">
                <img className="avatar avatar-md rounded-circle me-3" src="assets/images/avatar/02.jpg" alt="avatar" />
                <div>
                  <div className="mb-2">
                    <h5 className="m-0">Louis Ferguson</h5>
                    <span className="me-3 small">June 11, 2021 at 6:55 am</span>
                  </div>
                  <p>Water timed folly right aware if oh truth. Imprudence attachment him for sympathize. Large above be to means. Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected admiration everything.</p>
                  <a href="#" className="btn btn-sm btn-light mb-0">Reply</a>
                </div>
              </div>
              {/* Comment children level 3 */}
              <div className="my-4 d-flex ps-3 ps-md-5">
                <img className="avatar avatar-md rounded-circle me-3" src="assets/images/avatar/01.jpg" alt="avatar" />
                <div>
                  <div className="mb-2">
                    <h5 className="m-0">Frances Guerrero</h5>
                    <span className="me-3 small">June 12, 2021 at 7:30 am</span>
                  </div>
                  <p>Water timed folly right aware if oh truth.</p>
                  <a href="#" className="btn btn-sm btn-light mb-0">Reply</a>
                </div>
              </div>
              {/* Comment level 1 */}
              <div className="my-4 d-flex">
                <img className="avatar avatar-md rounded-circle me-3" src="assets/images/avatar/04.jpg" alt="avatar" />
                <div>
                  <div className="mb-2">
                    <h5 className="m-0">Judy Nguyen</h5>
                    <span className="me-3 small">June 18, 2021 at 11:55 am</span>
                  </div>
                  <p>Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther-related bed and passage comfort civilly.</p>
                  <a href="#" className="btn btn-sm btn-light mb-0">Reply</a>
                </div>
              </div>
            </div>
            {/* Comment END */}
            {/* Form START */}
            <div className="col-md-5">
              {/* Title */}
              <h3 className="mt-3 mt-sm-0">Your Views Please!</h3>
              <small>Your email address will not be published. Required fields are marked *</small>
              <form className="row g-3 mt-2 mb-5">
                {/* Name */}
                <div className="col-lg-6">
                  <label className="form-label">Name *</label>
                  <input type="text" className="form-control" aria-label="First name" />
                </div>
                {/* Email */}
                <div className="col-lg-6">
                  <label className="form-label">Email *</label>
                  <input type="email" className="form-control" />
                </div>
                {/* Comment */}
                <div className="col-12">
                  <label className="form-label">Your Comment *</label>
                  <textarea className="form-control" rows={3} defaultValue={""} />
                </div>
                {/* Button */}
                <div className="col-12">
                  <button type="submit" className="btn btn-primary mb-0">Post comment</button>
                </div>
              </form>
            </div>
            {/* Form END */}
          </div>
          {/* Comment review and form END */}
        </div>
      </div> {/* Row END */}
    </div>
  </section>
  {/* =======================
Main Content END */}
  {/* =======================
Related blog START */}
  <section className="pt-0">
    <div className="container">
      {/* Title */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-0">You may also like</h2>
        </div>
      </div>
      {/* Slider START */}
      <div className="tiny-slider arrow-round arrow-hover arrow-dark">
        <div className="tiny-slider-inner" data-autoplay="false" data-arrow="true" data-edge={2} data-dots="false" data-items={3} data-items-lg={2} data-items-sm={1}>
          {/* Slider item */}
          <div className="card bg-transparent">
            <div className="row g-0">
              {/* Image */}
              <div className="col-md-4">
                <img src="assets/images/event/06.jpg" className="img-fluid rounded-start" alt="..." />
              </div>
              {/* Card body */}
              <div className="col-md-8">
                <div className="card-body">
                  {/* Title */}
                  <h6 className="card-title"><a href="#">Dirty little secrets about the business industry</a></h6>
                  <span className="small">July 21, 2021</span>
                </div>
              </div>
            </div>
          </div>
          {/* Slider item */}
          <div className="card bg-transparent">
            <div className="row g-0">
              {/* Image */}
              <div className="col-md-4">
                <img src="assets/images/event/04.jpg" className="img-fluid rounded-start" alt="..." />
              </div>
              {/* Card body */}
              <div className="col-md-8">
                <div className="card-body">
                  {/* Title */}
                  <h6 className="card-title"><a href="#">This is why this year will be the year of startups</a></h6>
                  <span className="small">50min ago</span>
                </div>
              </div>
            </div>
          </div>
          {/* Slider item */}
          <div className="card bg-transparent">
            <div className="row g-0">
              {/* Image */}
              <div className="col-md-4">
                <img src="assets/images/event/03.jpg" className="img-fluid rounded-start" alt="..." />
              </div>
              {/* Card body */}
              <div className="col-md-8">
                <div className="card-body">
                  {/* Title */}
                  <h6 className="card-title"><a href="#">Covid-19 and the college experienced</a></h6>
                  <span className="small">Aug 31, 2021</span>
                </div>
              </div>
            </div>
          </div>
          {/* Slider item */}
          <div className="card bg-transparent">
            <div className="row g-0">
              {/* Image */}
              <div className="col-md-4">
                <img src="assets/images/event/05.jpg" className="img-fluid rounded-start" alt="..." />
              </div>
              {/* Card body */}
              <div className="col-md-8">
                <div className="card-body">
                  {/* Title */}
                  <h6 className="card-title"><a href="#">This is why this year will be the year of startups</a></h6>
                  <span className="small">50min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Slider END */}
    </div>
  </section>
  {/* =======================
Related blog END */}
</main>
{/* **************** MAIN CONTENT END **************** */}
<Footer/>

    </>
  )
}

export default BlogDetals