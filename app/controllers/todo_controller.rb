class TodoController < ApplicationController
  def index
    todos = {
      high: Todo.where(priority: 1),
      medium: Todo.where(priority: 2),
      low: Todo.where(priority: 3)
    }
    respond_to do |format|
      format.json { render :json => todos }
    end
  end

  def create
    Todo.new(todo_params)
    this.index
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :description)
  end
end
