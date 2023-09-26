import React from 'react';

const Home = () => {
	return (
		<div className="flex items-center justify-center">
			<main className="min-w-full min-h-screen grid grid-cols-[45%_55%]">
				<section className="flex justify-center px-20 py-10 bg-light-blue">
					<div>
						<h2 className="text-3xl my-10 text-center">
							Connexion
						</h2>
						<form
							id="login-form"
							className="flex flex-col items-start mb-24">
							<div className="flex flex-col">
								<label for="email">Email</label>
								<input
									type="email"
									id="emailLog"
									name="email"
									minlength="6"
									maxlength="254"
									autocomplete="off"
									required
								/>
								<span
									id="email-error"
									className="error-message"></span>
							</div>
						</form>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Home;
