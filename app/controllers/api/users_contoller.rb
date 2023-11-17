class Api::UsersController < ApplicationController
  def show
    user = User.find_by!(email: params[:email])

    if user
      render json: user
    else
      render json: { error: "User not found" }, status: :not_found
    end
    # respond_to do |format|
    #   format.json do
    #     render json: user.to_json, status: 200: :ok
    #   end
    # end
    # rescue ActiveRecord::RecordNotFound => e
    #   respond_to do |format|
    #     format.json do
    #       render json: { error: e.message }.to_json, status: :not_found
    #     end
    #   end
    # end
  end
end